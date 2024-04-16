export interface PrismaService{
    getPatientById(id: number): Promise<any>;
}


export class PrismaOperation implements PrismaService {
    async getPatientById(id: number): Promise<any> {
        // 实现具体的 Prisma 操作逻辑
        
        const response = await fetch(
          "http://localhost:3000/api/getPatientById",
          {
            method: "POST",
            body: JSON.stringify({
              patientId: idj,
              password: "1",
            }),
          }
        );
        const results = await response.json();
        const result = results.data;
        return Promise.resolve(result)
    }
    
}

const instance = new PrismaOperation();
export default instance;