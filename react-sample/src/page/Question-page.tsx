import * as React from 'react';
import { query } from '../Graphql/Graphql';
import { Link, withRouter } from 'react-router-dom';

interface IStates {
  question: {
    title: string,
    is_answered: boolean,
    body: string,
    answers: object[]
  }
}

interface IProps{
  match: any,
  history: any,
  isMounted: boolean,
  pageLoading: (status: boolean) => void
}


export default withRouter(class QuestionPage extends React.Component<IProps, IStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      question: {
        answers: [],
        body: '',
        is_answered: false,
        title: '',
      }
    }
  }

  public componentDidMount() {
    this.props.pageLoading(true);
    query(`{
      question(question_id: "${this.props.match.params.question_id}"){
        title
        is_answered
        body
        answers{
          answer_id
          body
        }
      }
    }`).then((res: any) => {
      this.setState({
        question: res.data.question
      })
      this.props.pageLoading(false);
    })
  }

  public componentWillUnmount() {
      console.log('hello')
      // setTimeout(()=>{
      //   console.log(30)
      // }, 30);
  }

  public overlayClick = (e: any)=>{
    const tar: HTMLElement = e.target;
    if(tar.className !== "topic") return;
    this.props.history.push('/');
  }

  public render() {
    const { question } = this.state;
    if(question.title){
      return (
        <div className="topic" onClick={this.overlayClick}>
          <article>
            <header>
              <Link className="back" to="/">Back</Link>
              <h1>Question: {question.title}</h1>
            </header>
            <div dangerouslySetInnerHTML={{__html: question.body}}/>
            <hr />
            <footer className="comments">
              {
                question.answers.map((answer: any)=>{
                  return (<div className="answer" key={answer.answer_id} dangerouslySetInnerHTML={{ __html: answer.body}} />)
                })
              }
            </footer>
          </article>
        </div>
      )
    }
    return (null)
  }
})
