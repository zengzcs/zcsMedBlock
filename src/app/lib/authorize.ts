import gethInstance from "@/app/lib/getGethInstance";
export interface Authorize {
  patientAuthorizeToDoctor(pid: number, did: number): Promise<string>;
}
export class AuthorizeService implements Authorize {
  async patientAuthorizeToDoctor(pid: number, did: number): Promise<string> {
    async function database() {
      const result = await fetch("/api/authPtoD", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientId: pid,
          doctorId: did,
        }),
      });
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
      alert("授权成功");
    } else alert("授权失败");
  }
}

const instance = new AuthorizeService();
export default instance;
