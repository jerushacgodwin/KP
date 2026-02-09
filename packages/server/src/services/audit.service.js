const AuditLog = require('../models/auditLog.model');

/**
 * Service to handle audit logging across the application.
 */
class AuditService {
  /**
   * Logs an action to the audit_logs table.
   * 
   * @param {Object} req - The Express request object (to extract user, IP, UA).
   * @param {string} action - The action type (LOGIN, CREATE, UPDATE, DELETE).
   * @param {string} module - The module name (STUDENT, STAFF, ATTENDANCE, etc.).
   * @param {string|number} entityId - The ID of the primary entity being modified.
   * @param {Object|null} oldValue - The object state before modification.
   * @param {Object|null} newValue - The object state after modification.
   */
  static async logAction(req, action, module, entityId = null, oldValue = null, newValue = null) {
    try {
      const user_id = req.user ? (req.user.email || req.user.username) : 'System';
      const ip_address = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      const user_agent = req.headers['user-agent'];

      await AuditLog.create({
        user_id,
        action,
        module,
        entity_id: entityId ? String(entityId) : null,
        old_value: oldValue ? JSON.stringify(oldValue) : null,
        new_value: newValue ? JSON.stringify(newValue) : null,
        ip_address,
        user_agent
      });
      
          } catch (error) {
      console.error('[AuditLog Error] Failed to create audit log:', error);
    }
  }
}

module.exports = AuditService;
