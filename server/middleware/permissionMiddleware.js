import { RoleModel } from "../models/roleModel.js";

// change needed in check permission middleware for passing the 2 values as params

export const checkPermission = (action, menu_id) => {
  return async (req, res, next) => {
    const userRole = req.user?.role_id;

    if (!userRole) {
      return res.status(403).json({ message: "Access Denied: Missing role ID" });
    }

    const permissions = await RoleModel.getPermissionsByRole(userRole);

    const hasPermission = permissions.some(
      (perm) => perm.permission_action === action && perm.menu_id === menu_id
    );

    if (!hasPermission) {
      return res.status(403).json({ message: "Access Denied: Insufficient permissions" });
    }

    next();
  };
};
