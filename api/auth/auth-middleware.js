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
const authModel = require("../auth/auth-model");
const bcryptjs = require("bcryptjs");

//Register unique username
async function usernameBostaMi(req, res, next) {
  try {
    const { username } = req.body;
    const isExist = await authModel.getBy({ username: username });
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

//Register unique email
async function emailBostaMi(req, res, next) {
  try {
    const { email } = req.body;
    const isExist = await authModel.getBy({ email: email });
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

async function a(req, res, next) {
  try {
  } catch (error) {}
}

// //Loginde kullanılacak.
// async function usernameVarmi(req, res, next) {
//   try {
//     let { username } = req.body;
//     const isExist = await userModel.goreBul({ username: username });
//     if (isExist && isExist.length > 0) {
//       let user = isExist[0];
//       let isPasswordMatch = bcryptjs.compareSync(
//         req.body.password,
//         user.password
//       );
//       if (isPasswordMatch) {
//         req.dbUser = user;
//         next();
//       } else {
//         res.status(401).json({
//           message: "Geçersiz kriter",
//         });
//       }
//     } else {
//       res.status(401).json({
//         message: "Geçersiz kriter",
//       });
//     }
//   } catch (error) {
//     next(error);
//   }
// }

// //Login ve register
// function sifreGecerlimi(req, res, next) {
//   try {
//     let { password } = req.body;
//     if (!password || password.length < 3) {
//       res.status(422).json({ message: "Şifre 3 karakterden fazla olmalı" });
//     } else {
//       next();
//     }
//   } catch (error) {
//     next(error);
//   }
// }
// //Login ve Register
// function checkPayload(req, res, next) {
//   try {
//     let { username, password } = req.body;
//     if (!username || !password) {
//       res.status(422).json({ message: "Şifre 3 karakterden fazla olmalı" });
//     } else {
//       next();
//     }
//   } catch (error) {
//     next(error);
//   }
// }

module.exports = {
  usernameBostaMi,
  emailBostaMi,
};
