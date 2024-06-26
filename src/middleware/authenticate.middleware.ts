const jwt = require("jsonwebtoken");

export function authenticate(req: Request, res: Response, next: any) {
  const token = req.headers.get("Authorization");
  const SECRET_KEY: any = process.env.SECRET_KEY;
  jwt.verify(token, "shhhhh", function (err: any, decoded: any) {
    console.log(decoded.foo); // bar
  });
}
