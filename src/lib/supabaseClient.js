// app/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

//
// =======================
// CONFIGURACIÓN SUPABASE
// =======================
//

const supabaseUrl = 'https://qfxxspgxsvlbsbeosqgu.supabase.co';
const supabaseAnonKey = 'sb_publishable_MHwQqLk6xwTwRKPT0BFUKg_u67pLrCL';

/**
 * 💡 SOLUCIÓN PARA SEPARAR SESIONES:
 * Creamos dos clientes con diferentes 'storageKey'. 
 * Esto hace que el navegador guarde los tokens en lugares distintos.
 */

// Cliente para Trabajadores (Microsoft / Azure) - Usará el nombre por defecto o uno específico
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storageKey: 'sb-worker-session', // Llave única para trabajadores
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Cliente para Clientes (Google / Customer Portal)
export const supabaseGoogle = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storageKey: 'sb-customer-session', // Llave única para clientes externos
    persistSession: true,
    autoRefreshToken: true,
  }
});

//
// =======================
// AUTH (SOLO AZURE / TRABAJADORES)
// =======================
//

// 🔐 Login con Microsoft Entra ID (Azure)
export async function signInWithAzure() {
  // Usa la instancia 'supabase' (Trabajadores)
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'azure',
  });

  if (error) {
    console.error('❌ Error login Azure:', error);
    throw error;
  }
}

// 👤 Obtener user autenticado (Google)
export async function getCurrentUser() {
  const { data, error } = await supabaseGoogle.auth.getUser();

  if (error) {
    if (error.message.includes('Auth session missing')) {
      return null;
    }
    console.error('❌ Error fetching user:', error);
    return null;
  }

  if (!data?.user) return null;

  const user = data.user;
  const email =
    user.email ||
    user.user_metadata?.email ||
    user.user_metadata?.preferred_username ||
    null;

  const provider = user.app_metadata?.provider;

  // Permitimos auth con Google
  const isGoogle = provider === 'google';

  if (!isGoogle) {
    console.warn('🚫 Acceso denegado: Solo se permite Google', { email, provider });
    await supabaseGoogle.auth.signOut();
    return null;
  }

  return {
    id: user.id,
    email,
    provider,
    raw: user,
  };
}

// 🔁 Escuchar cambios de sesión
export function subscribeToAuthState(callback) {
  const {
    data: { subscription },
  } = supabaseGoogle.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });

  return subscription;
}

// 🚪 Logout (Google)
export async function signOut() {
  const { error } = await supabaseGoogle.auth.signOut();
  if (error) {
    console.error('❌ Error al close sesión:', error);
  }
}

//
// =======================
// DATA
// =======================
//

export async function saveAuditToSupabase({ audit_content, user }) {
  if (!user?.id) {
    console.warn('⚠️ Auditoría sin user válido');
    return { data: null, error: 'NO_USER' };
  }

  const { data, error } = await supabase
    .from('auditorias')
    .insert([
      {
        audit_content: JSON.stringify(audit_content),
        user_id: user.id,
        user_email: user.email,
        provider: user.provider,
      },
    ])
    .select();

  if (error) {
    console.error('❌ Error saving audit:', error);
    return { data: null, error };
  }

  return { data, error: null };
}

//
// =======================
// AX CHAT HISTORY
// =======================
//

// 📥 Fetch chat history (One row per user, parsed from JSON)
export async function fetchChatHistory(userId) {
  if (!userId) return [];
  
  const { data, error } = await supabaseGoogle
    .from('AX_chat')
    .select('content')
    .eq('user_id', userId)
    .single();
    
  if (error && error.code !== 'PGRST116') {
    // PGRST116 means 0 rows returned (normal for new users)
    console.error('❌ Error fetching chat history:', error);
    return [];
  }
  
  if (data && data.content) {
    try {
      return JSON.parse(data.content);
    } catch (e) {
      console.error('❌ Error parsing chat history JSON:', e);
      return [];
    }
  }
  
  return [];
}

// 📤 Save chat history (Overwrites the single user row with the full messages array)
export async function saveChatHistory(userId, messagesArray) {
  if (!userId || !messagesArray) return;
  
  const contentString = JSON.stringify(messagesArray);

  // 1. Verificar si ya existe una fila para este usuario
  const { data: existingRow } = await supabaseGoogle
    .from('AX_chat')
    .select('id')
    .eq('user_id', userId)
    .single();

  if (existingRow) {
    // 2. Si existe, actualizamos el content
    const { error } = await supabaseGoogle
      .from('AX_chat')
      .update({ content: contentString })
      .eq('id', existingRow.id);
      
    if (error) console.error('❌ Error updating chat history:', error);
  } else {
    // 3. Si no existe, creamos una nueva
    const { error } = await supabaseGoogle
      .from('AX_chat')
      .insert([{ user_id: userId, role: 'history', content: contentString }]);
      
    if (error) console.error('❌ Error inserting chat history:', error);
  }
}