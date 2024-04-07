
export default async function tests() {
   const info = await fetch("/api/getPatientsInfo", {
     method: "GET",
   });
  alert(info.json());
  return <div>hhh</div>;
}
