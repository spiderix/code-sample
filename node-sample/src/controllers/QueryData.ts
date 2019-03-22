import fetch from 'node-fetch'

const url = 'https://api.stackexchange.com/2.2/';

interface IFieldsArgs {
  route?: string,
  intitle?: string,
  pagesize?: number,
  question_id?: number,
  filter?: string,
  [key:string]: any
}

class QueryData {

  private async query(args: IFieldsArgs): Promise<any>{
    try {
      const { route } = args;
      delete args.route;
      let params = Object.keys(args).map(i=>{
        return `${i}=${args[i]}`;
      }).join('&')
      const req = await fetch(`${url}${route}?${params}&site=stackoverflow`);
      return await req.json();
    } catch (error) {
      return false;
    }
  }

  public async search(args: IFieldsArgs){
    try{
      args.route = "search"
      let req = await this.query(args)
      return req.items;
    }catch (err ){
      console.log(err);
    }
  }


  /**
   * Returns question object
   * @param args IFieldsArgs
   */
  public async getQuestionById(args: IFieldsArgs){
    const { question_id } = args;
    delete args.question_id;
    try {
      args.route = `questions/${question_id}`;
      args.filter = '!9Z(-wwYGT';
      let req = await this.query(args)
      return req.items[0];
    } catch (error) {
      return {}
    }
  }

  /**
   * Function return answers in question
   * @param args IFieldsArgs type
   */
  public async getAnswers(args: IFieldsArgs){
    const { question_id, is_accepted } = args;
    delete args.question_id;
    // delete args.is_accepted;
    try {
      args.route = `questions/${question_id}/answers`
      args.filter = '!9Z(-wzu0T'
      let req = await this.query(args)
      console.log(is_accepted)
      if (is_accepted) return req.items.filter((i:any) => i.is_accepted===true)
      return req.items;
    } catch (error) {
      
    }
  }
}

export default new QueryData()