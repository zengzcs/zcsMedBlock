export const getPatientInfoJSON = () => {
  const PatientPersonalInfoData = {
    name: document.getElementById("name").value,
    icNumber: document.getElementById("icNumber").value,
    phoneNumber: document.getElementById("phoneNumber").value,
    occupation: document.getElementById("occupation").textContent,
    email: document.getElementById("email").value,
    gender: document.getElementById("sex").textContent,
    height: document.getElementById("height").value,
    weight: document.getElementById("weight").value,
    bloodGroup: document.getElementById("bloodGroup").textContent,
    address: document.getElementById("address").value,
    emergentContactName: document.getElementById("emergentContactName").value,
    emergentContactPhoneNumber: document.getElementById(
      "emergentContactPhoneNumber"
    ).value,
    medications: document.getElementById("medications").value,
    allergies: document.getElementById("allergies").value,
  };
  return PatientPersonalInfoData;
}

export default async function handleCommit() {
  
  const PatientPersonalInfoData=getPatientInfoJSON();

  // 将对象转换为 JSON 字符串
  const jsonPayload = JSON.stringify(PatientPersonalInfoData);

  // 打印 JSON 字符串
  console.log(jsonPayload);

  const a = await fetch("/api/admin", {
    method: "POST",
    body: jsonPayload, // 将表单数据作为请求体
  });
  console.log(a);
  if (a.ok) {
    alert("提交成功");
  } else {
    alert("提交失败");
  }
}
