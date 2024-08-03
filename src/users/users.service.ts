import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
export class UsersService {
    private readonly filePath = path.join(__dirname, '../../learning.json');

    private getFile(): string {
      return this.filePath;
    }
    private async setFileValue(data: any[]): Promise<void> {
        await fs.writeFile(this.getFile(), JSON.stringify(data), 'utf8');
    }
   
    private async getFileValue(): Promise<any[]> {
        try {
          const fileContent = await fs.readFile(this.getFile(), 'utf8');
          return JSON.parse(fileContent);
        } catch (error) {
          console.error('Error reading file', error);
          throw new Error('Could not read file');
        }
    }
  
  

    async writeTextToFile(params: any): Promise<string> {
    let newdata = await this.getFileValue();

        const find =  newdata.findIndex((item) => item?.name === params.name);
        
        if( find !== -1) return `${params.name}  already exists`;
        
        newdata.push(params);
        await this.setFileValue(newdata)
        return 'Text written to file successfully';
    }

    async readTextToFile():Promise<object> {
        return await this.getFileValue()
    }

    async readByName(name: string):Promise<object> {
        let newdata = [];
        newdata = await this.getFileValue()
        const find =  newdata.find((item) => item.name == name);
        return find
    }
    async deleteByName(name: string):Promise<string> {
        let newdata = await this.getFileValue()
        const index = newdata.findIndex((item) => item.name === name);
        if (index !== -1) {
        newdata.splice(index, 1);
         await this.setFileValue(newdata);
        return "succesfully deleted " + name
        }
        else return "No such Record Found"
        
    }
}

