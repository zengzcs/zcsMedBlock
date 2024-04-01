export default async function handleCommit() {


  const formElements = {
    name: document.getElementById("name").value,
    icNumber: document.getElementById("icNumber").value,
    phoneNumber: document.getElementById("phoneNumber").value,
    occupation: document.getElementById("occupation").textContent,
    email: document.getElementById("email").value,
    sex: document.getElementById("sex").textContent,
    height: document.getElementById("height").value,
    weight: document.getElementById("weight").value,
    bloodGroup: document.getElementById("bloodGroup").textContent,
    address: document.getElementById("address").value,
    medications: document.getElementById("medications").value,
    emergentContactName: document.getElementById("emergentContactName").value,
    emergentContactPhoneNumber: document.getElementById(
      "emergentContactPhoneNumber"
    ).value,
    allergies: document.getElementById("allergies").value,
  };

  // 创建一个 JSON 对象
  const formData = {
    name: formElements.name,
    icNumber: formElements.icNumber,
    phoneNumber: formElements.phoneNumber,
    occupation: formElements.occupation,
    email: formElements.email,
    sex: formElements.sex,
    height: formElements.height,
    weight: formElements.weight,
    bloodGroup: formElements.bloodGroup,
    address: formElements.address,
    medications: formElements.medications,
    emergentContactName: formElements.emergentContactName,
    emergentContactPhoneNumber: formElements.emergentContactPhoneNumber,
    allergies: formElements.allergies,
  };

  // 将对象转换为 JSON 字符串
  const jsonPayload = JSON.stringify(formData);

  // 打印 JSON 字符串
  console.log(jsonPayload);

  const a = await fetch("/api/admin", {
    method: "POST",
    body: jsonPayload, // 将表单数据作为请求体
  });
  console.log(a);
  //   if (!response.ok) {
  //     throw new Error("Network response was not ok");
  //   }
  //   return response.json(); // 解析 JSON 响应体
  // })
  // .then((data) => {
  //   console.log(data); // 处理响应数据
  // })
  // .catch((error) => {
  //   console.error(
  //     "There has been a problem with your fetch operation:",
  //     error
  //   );
  // });

  //   const patient = await prisma.patient.create({
  //     data: {
  //       name: name.value,
  //       icNumber: icNuber.value,
  //       phoneNumber: phoneNumber.value,
  //       occupation: occpation.value,
  //       email: email.value,
  //       gender: sex.value,
  //       height: Number(height.value),
  //       weight: Number(weight.value),
  //       bloodGroup: bloodGroup.value,
  //       address: address.value,
  //       currentMedication: medications.value,
  //       allergy: allergies.value,
  //       emergentContactName: emergentContactName.value,
  //       emergentContactPhoneNumber: emergentContactPhoneNumber.value,
  //     },
  //   });
  //   alert(`Patient created: ${patient.id}`);
  //   return <h1>Cu</h1>;
}
