//Router checklist
//1. Router i expressten import et. DONE
//2. Ilgili routeri en altta export et. DONE
//3. Bir model dosyasi varsa bunu import et. DONE

//Register & Login icin:
//4. Eger bcrpyt gibi bi sifreleme kutuphanesi kullanacaksak onu ilgili kutuphaneden import et(bcryptjs) DONE
//5. Token kullanacaksak da tokeni ilgili kutuphaneden al(jsonwebtoken) DONE
//6. Secret kullaniyorsak da ilgili index dosyasindan JWT_SECRET i al (secret/index) DONE

//Register Checklist:
//7. Bodyden username ve password alinir
//8. Password hashlenerek yeni user olarak tanimlanan passworde aktarilir
//9. model dosyasindan ilgili yontem ile data base eklenir.
//10 basariliysa 201 olarak user json olarak donulur. degilse error nexte aktarilir.

//Login Checklist:
//11. Bodyden username ve password alinir
//12. modelden ilgili filtreleme methodu ile ilgili username cekilir
//13. password ile hashlanen password karsilastirmasi yapilir(compareSync), eger eslesmezse 400 status ile ilgili mesaj donulur
//14. basarili ise payload a ilgili username ve id eklenir ve token degiskenine aktarilir.
//15. token degiskeni sirayla payload, secret ve gecerlilik suresini alarak res basariliysa 201 ile token keyine value olarak olusturulan token atanir.
//16. hataliysa nexte aktarilir.

//Etkiledigi dosyalar:
//17. Bu routeri server.js dosyasina import et.
//18. server.use() icine hangi url i temsil edecekse once onu sonra ilgili degiskeni ekle.

const router = require("express").Router();
const authModel = require("../auth/auth-model");
const bcrpyt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secret/index");

router.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = bcrpyt.hashSync(password, 8);
    const newUser = {
      username: username,
      password: hashedPassword,
    };
    const insertedUser = await authModel.create(newUser);
    res.status(201).json(insertedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
