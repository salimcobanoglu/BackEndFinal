//MW Checklist
//Initial Setup -DONE-
//1. Model dosyasini import et.
//2. Loginde kullanmak uzere bcrypt i import et.
//3. En altta module.export yap.

//Register & Login icin:
//4. Register icin username ve email zaten var mi kontrolu yapan mwi yaz. Bunun icin modelden getBy i kullan,
//   ikisi bir arada olur mu tek tek mi yapmak lazim, dene.
//5. Loginde kullanmak uzere ilgili username databasede var mi bak. Yine getBy ile bul ve req teki pass ile userdaki pass karsilastir.
//6. Ek olarak payloadu kontrol eden username veya passwordten biri yoksa hata veren bir mw yaz.
//7. ESNEK: Istersek bir de sifre uzunlugu en az 3 karakter olacak sekilde bir mw de yazabiliriz.
const userModel = require("../users/users-model");
const bcryptjs = require("bcryptjs");
const validator = require("validator");
const { JWT_SECRET } = require("../secret");
const jwt = require("jsonwebtoken");

//REGISTER
function checkPayload(req, res, next) {
  const { username, password, email } = req.body;

  let usernameCheck = username.length > 3;
  let passwordCheck = password.length > 5;
  let emailCheck = validator.isEmail(email);

  try {
    if (!usernameCheck) {
      res
        .status(400)
        .json({ message: "Username must be at least 3 characters." });
    } else if (!passwordCheck) {
      res
        .status(400)
        .json({ message: "Password must be at least 5 characters." });
    } else if (!emailCheck) {
      res.status(400).json({ message: "Email address is not valid." });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

async function usernameBostaMi(req, res, next) {
  try {
    const { username } = req.body;
    const isExist = await userModel.getBy({ username: username });
    if (isExist && isExist.lenght > 0) {
      //Burada lenght kontrolu neden yapiyoruz?
      res.status(422).json({ message: "kullanici zaten mevcut" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

async function emailBostaMi(req, res, next) {
  try {
    const { email } = req.body;
    const isExist = await userModel.getBy({ email: email });
    if (isExist) {
      res.status(422).json({ message: "kullanici zaten mevcut" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}
//REGISTER ENDED

//LOGIN
function checkPayloadLogin(req, res, next) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ message: "Username or email are required." });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

async function usernameVarmi(req, res, next) {
  try {
    const { username } = req.body;
    const isExist = await userModel.getBy({ username: username });
    if (isExist) {
      let user = isExist;
      let isPasswordMatch = bcryptjs.compareSync(
        req.body.password,
        user.password
      );
      if (isPasswordMatch) {
        req.user = user;
        next();
      } else {
        res.status(401).json({ message: "kullanici mecvut degil" });
      }
    } else {
      res.status(401).json({ message: "kullanici mecvut degil" });
    }
  } catch (error) {
    next(error);
  }
}

//LOGIN ENDED

module.exports = {
  checkPayload,
  usernameBostaMi,
  emailBostaMi,
  usernameVarmi,
  checkPayloadLogin,
};
