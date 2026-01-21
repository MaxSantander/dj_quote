const USERS_KEY = 'djQuoteUsers';
const VERIFICATION_CODES_KEY = 'djQuoteVerificationCodes';

/**
 * Genera un código de verificación de 6 dígitos
 */
export const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Guarda un código de verificación temporalmente (válido por 24 horas)
 */
export const saveVerificationCode = (email, code) => {
  try {
    const codes = loadVerificationCodes();
    codes[email] = {
      code,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 horas
    };
    localStorage.setItem(VERIFICATION_CODES_KEY, JSON.stringify(codes));
  } catch (error) {
    console.error('Error guardando código de verificación:', error);
  }
};

/**
 * Verifica un código de verificación
 */
export const verifyCode = (email, code) => {
  try {
    const codes = loadVerificationCodes();
    const codeData = codes[email];
    
    if (!codeData) {
      return { valid: false, message: 'No se encontró código de verificación' };
    }
    
    if (Date.now() > codeData.expiresAt) {
      delete codes[email];
      localStorage.setItem(VERIFICATION_CODES_KEY, JSON.stringify(codes));
      return { valid: false, message: 'Código de verificación expirado' };
    }
    
    if (codeData.code !== code) {
      return { valid: false, message: 'Código de verificación incorrecto' };
    }
    
    // Código válido, eliminarlo
    delete codes[email];
    localStorage.setItem(VERIFICATION_CODES_KEY, JSON.stringify(codes));
    
    return { valid: true };
  } catch (error) {
    console.error('Error verificando código:', error);
    return { valid: false, message: 'Error al verificar código' };
  }
};

/**
 * Carga los códigos de verificación
 */
const loadVerificationCodes = () => {
  try {
    const saved = localStorage.getItem(VERIFICATION_CODES_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch (error) {
    console.error('Error cargando códigos:', error);
    return {};
  }
};

/**
 * Crea un nuevo usuario
 */
export const createUser = (email, password, role = 'user') => {
  try {
    const users = loadUsers();
    
    if (users[email]) {
      return { success: false, message: 'El email ya está registrado' };
    }
    
    const user = {
      email,
      password, // En producción, esto debería estar hasheado
      role,
      verified: false,
      createdAt: new Date().toISOString()
    };
    
    users[email] = user;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    return { success: true, user };
  } catch (error) {
    console.error('Error creando usuario:', error);
    return { success: false, message: 'Error al crear usuario' };
  }
};

/**
 * Verifica las credenciales de un usuario
 */
export const authenticateUser = (email, password) => {
  try {
    const users = loadUsers();
    const user = users[email];
    
    if (!user) {
      return { success: false, message: 'Usuario no encontrado' };
    }
    
    if (user.password !== password) {
      return { success: false, message: 'Contraseña incorrecta' };
    }
    
    if (!user.verified) {
      return { success: false, message: 'Email no verificado', needsVerification: true };
    }
    
    return { success: true, user };
  } catch (error) {
    console.error('Error autenticando usuario:', error);
    return { success: false, message: 'Error al autenticar' };
  }
};

/**
 * Marca un usuario como verificado
 */
export const verifyUser = (email) => {
  try {
    const users = loadUsers();
    if (users[email]) {
      users[email].verified = true;
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      return { success: true };
    }
    return { success: false, message: 'Usuario no encontrado' };
  } catch (error) {
    console.error('Error verificando usuario:', error);
    return { success: false, message: 'Error al verificar usuario' };
  }
};

/**
 * Carga todos los usuarios
 */
export const loadUsers = () => {
  try {
    const saved = localStorage.getItem(USERS_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch (error) {
    console.error('Error cargando usuarios:', error);
    return {};
  }
};

/**
 * Obtiene un usuario por email
 */
export const getUser = (email) => {
  const users = loadUsers();
  return users[email] || null;
};

/**
 * Inicializa el super usuario si no existe
 */
export const initializeSuperUser = () => {
  const users = loadUsers();
  const superUserEmail = 'admin@djquotepro.com';
  
  if (!users[superUserEmail]) {
    // Crear usuario directamente sin usar createUser para evitar validaciones
    const user = {
      email: superUserEmail,
      password: 'admin123',
      role: 'superuser',
      verified: true,
      createdAt: new Date().toISOString()
    };
    
    users[superUserEmail] = user;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    console.log('✅ Super usuario creado:', superUserEmail, '| Contraseña: admin123');
  } else {
    // Asegurar que el super usuario esté verificado
    if (!users[superUserEmail].verified) {
      users[superUserEmail].verified = true;
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
  }
};
