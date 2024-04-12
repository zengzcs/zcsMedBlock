import gethInstance from "@/app/lib/getGethInstance";
export interface Authorize {
  patientAuthorizeToDoctor(pid: number, did: number): Promise<string>;
}
export class AuthorizeService implements Authorize {
  async patientAuthorizeToDoctor(pid: number, did: number): Promise<string> {
    const responses = await fetch("http://localhost:3000/api/authVerifyPtoD", {
      method: "POST",
      body: JSON.stringify({
        patientId: pid,
        doctorId: did,
      }),
    });

    const isReplete = await responses.json();
    console.log("isReplete:");
    console.log(isReplete);
    if (isReplete.replete) {
      // return Promise.resolve("replete");
    }
    // else
    {
      async function database() {
        const result = await fetch("http://localhost:3000/api/authPtoD", {
          method: "POST",
          body: JSON.stringify({
            patientId: pid,
            doctorId: did,
          }),
        });
        console.log(result)
        return result;

      }
      async function geth() {
        const result = await gethInstance.authorizedPatientInfoToDoctor(
          JSON.stringify({
            patientId: pid,
            doctorId: did,
          })
        );
        return result;
      }
      const dr = await database();
      const gr = await geth();
      if (dr.ok && gr == "ok") {
        alert("授权成功")
        return Promise.resolve("授权成功");
      } else return Promise.resolve("授权失败");
    }
  }
}

const instance = new AuthorizeService();
export default instance;
