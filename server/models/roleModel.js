import db from "../config/db.js";

export default class RoleModel {
  // Returns array of { menu_id, permission_action } for a given role_id
  static async getPermissionsByRole(role_id) {
    const [rows] = await db.query(
      `SELECT p.menu_id, p.permission_action
       FROM permissions p
       JOIN role_permissions rp ON p.permission_id = rp.permission_id
       WHERE rp.role_id = ?`,
      [role_id]
    );
    return rows; // [{ menu_id: 2, permission_action: 'create' }, ...]
  }

  //below function uses in role_permission.js

  static async getRoleIdByName(roleName) {
    const [rows] = await db.query("SELECT role_id FROM roles WHERE role_name = ?", [roleName]);
    return rows[0]?.role_id || null;
  }


  //Role Model starts from here

      static async getAllRoles() {
        const [rows] = await db.query("SELECT * FROM roles ORDER BY role_id ASC");
        return rows;
      }
    


      static async findByName(role_name) {
        const [rows] = await db.query("SELECT * FROM roles WHERE role_name = ?", [role_name]);
        return rows[0];
      }
    
      static async createRole(role_name) {
        const [result] = await db.query("INSERT INTO roles (role_name) VALUES (?)", [role_name]);
        return result.insertId;
      }
    
      static async updateRole(role_id, role_name) {
        await db.query("UPDATE roles SET role_name = ? WHERE role_id = ?", [role_name, role_id]);
      }
    
      static async deleteRole(role_id) {
        await db.query("DELETE FROM roles WHERE role_id = ?", [role_id]);
      }
  }
    
  


