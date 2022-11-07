import { Router } from "express";
import is from "@sindresorhus/is";
import { adminOnly, loginRequired } from "../middlewares";
import { userService } from "../services";

const userRouter = Router();

userRouter.post("/register", async (req, res, next) => {
  try {
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const fullName = req.body.fullName;
    const email = req.body.email;
    const password = req.body.password;

    // 위 데이터를 유저 db에 추가하기
    const newUser = await userService.addUser({
      fullName,
      email,
      password,
    });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

userRouter.post("/login", async function (req, res, next) {
  try {
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const email = req.body.email;
    const password = req.body.password;

    // 위 데이터가 db에 있는지 확인하고,
    // db 있을 시 로그인 성공 및, 토큰 및 관리자 여부 받아오기
    const loginResult = await userService.getUserToken({ email, password });

    res.status(200).json(loginResult);
  } catch (error) {
    next(error);
  }
});

userRouter.post(
  "/user/password/check",
  loginRequired,
  async function (req, res, next) {
    try {
      // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }

      // req (request) 에서 데이터 가져오기
      const userId = req.currentUserId;
      const password = req.body.password;

      // 비밀번호가 알맞는지 여부를 체크함
      const checkResult = await userService.checkUserPassword(userId, password);

      res.status(200).json(checkResult);
    } catch (error) {
      next(error);
    }
  }
);

// 전체 유저 목록은 관리자만 조회 가능함.
userRouter.get("/userlist", adminOnly, async function (req, res, next) {
  try {
    // 전체 사용자 목록을 얻음
    const users = await userService.getUsers();

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

userRouter.get("/user", loginRequired, async function (req, res, next) {
  try {
    const userId = req.currentUserId;
    const currentUserInfo = await userService.getUserData(userId);

    res.status(200).json(currentUserInfo);
  } catch (error) {
    next(error);
  }
});

// 사용자 정보 수정
userRouter.patch(
  "/users/:userId",
  loginRequired,
  async function (req, res, next) {
    try {
      // content-type 을 application/json 로 프론트에서
      // 설정 안 하고 요청하면, body가 비어 있게 됨.
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }

      // params로부터 id를 가져옴
      const userId = req.params.userId;

      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const fullName = req.body.fullName;
      const password = req.body.password;
      const address = req.body.address;
      const phoneNumber = req.body.phoneNumber;
      const role = req.body.role;

      // body data로부터, 확인용으로 사용할 현재 비밀번호를 추출함.
      const currentPassword = req.body.currentPassword;

      // currentPassword 없을 시, 진행 불가
      if (!currentPassword) {
        throw new Error("정보를 변경하려면, 현재의 비밀번호가 필요합니다.");
      }

      const userInfoRequired = { userId, currentPassword };

      // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
      // 보내주었다면, 업데이트용 객체에 삽입함.
      const toUpdate = {
        ...(fullName && { fullName }),
        ...(password && { password }),
        ...(address && { address }),
        ...(phoneNumber && { phoneNumber }),
        ...(role && { role }),
      };

      // 사용자 정보를 업데이트함.
      const updatedUserInfo = await userService.setUser(
        userInfoRequired,
        toUpdate
      );

      res.status(200).json(updatedUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

// 사용자 권한 수정 (관리자만 가능)
userRouter.patch(
  "/users/role/:userId",
  adminOnly,
  async function (req, res, next) {
    try {
      // content-type 을 application/json 로 프론트에서
      // 설정 안 하고 요청하면, body가 비어 있게 됨.
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }

      // params로부터 id를 가져옴
      const userId = req.params.userId;

      // body data 로부터 업데이트할 사용자 권한 정보를 추출함.
      const role = req.body.role;

      // 사용자 정보를 업데이트함.
      const updatedUserInfo = await userService.setRole(userId, role);

      res.status(200).json(updatedUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

// 주문 시 사용한 주소 및 연락처를 유저 데이터로 저장함.
userRouter.post(
  "/user/deliveryinfo",
  loginRequired,
  async function (req, res, next) {
    try {
      // content-type 을 application/json 로 프론트에서
      // 설정 안 하고 요청하면, body가 비어 있게 됨.
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }

      // 토큰으로부터 추출됐던 id를 가져옴
      const userId = req.currentUserId;

      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const address = req.body.address;
      const phoneNumber = req.body.phoneNumber;

      // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
      // 보내주었다면, 업데이트용 객체에 삽입함.
      const deliveryinfo = {
        ...(address && { address }),
        ...(phoneNumber && { phoneNumber }),
      };

      // 사용자 정보를 업데이트함.
      const updatedUserInfo = await userService.saveDeliveryInfo(
        userId,
        deliveryinfo
      );

      res.status(200).json(updatedUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.delete(
  "/users/:userId",
  loginRequired,
  async function (req, res, next) {
    try {
      // params로부터 id를 가져옴
      const userId = req.params.userId;

      const deleteResult = await userService.deleteUserData(userId);

      res.status(200).json(deleteResult);
    } catch (error) {
      next(error);
    }
  }
);

// 관리자 토큰을 가졌는지 여부를 확인함.
userRouter.get("/admin/check", adminOnly, async function (req, res, next) {
  try {
    // 미들웨어 adminOnly 를 통과했다는 것은, 관리자 토큰을 가진 것을 의미함.
    res.status(200).json({ result: "success" });
  } catch (error) {
    next(error);
  }
});

export { userRouter };
