// export * from "./authController";
// export * from "./custController";

import custCtrl from "./custController";
import authCtrl from "./authController";
import compCtrl from "./compController";
import userCtrl from "./userController";
import addrCtrl from "./addressController";

module.exports = {
  custCtrl,
  authCtrl,
  compCtrl,
  userCtrl,
  addrCtrl
};
