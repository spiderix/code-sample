import * as React from 'react'
import { query } from '../Graphql/Graphql';
import { Button, ListItem, ListItemText, ListItemIcon, TextField, Paper, Icon } from '@material-ui/core';
import { Link } from 'react-router-dom';

interface IStates {
  results: object[],
  search: string,
}

interface IProps {
  pageLoading: (status: boolean) => void
}

interface IQueryResult {
  question_id: string,
  title: string,
  is_answered: boolean
}

export default class SearchPage extends React.Component<IProps, IStates> {

  constructor(props:any){
    super(props);
    this.state = {
      results: [],
      search: ''
    }
  }

  public doQuery = ()=>{
    this.props.pageLoading(true)
    query(`{
      search(intitle: "${this.state.search}"){
        question_id
        title
        is_answered
      }
    }`).then((res: any) => {
      this.setState({
        results: res.data[Object.keys(res.data)[0]]
      })
      this.props.pageLoading(false);
    }).catch(err=>console.log(err))
  }

  public handleSearchChange = (e:any)=>{
    this.setState({
      search: e.target.value,
    });
    
  }

  public handleItemClick = ()=>{
    console.log('handleItemClick')
    // this.props.onPageLoad({
    //   loading: true
    // })
  }
  
  public render() {
    
    return (
      <React.Fragment>

        <Paper className="search">
          <TextField id="search"
            label="Search..."
            className="search"
            onChange={this.handleSearchChange}
            fullWidth={true} variant="filled"
            margin="dense"
          />
          <div className="row">
            <Button onClick={this.doQuery} color="primary" variant="outlined" disabled={!this.state.search} style={{margin:"10px auto"}}>Search</Button>
          </div>
        </Paper>
        <Paper className={`search search-result ${this.state.results.length>0?'':'hidden'}`}>
            {
              this.state.results &&
              this.state.results.map((i: IQueryResult)=>(
                  <ListItem button={true} component={Link} {...{to: `/question/${i.question_id}`}} key={i.question_id} onClick={this.handleItemClick}>
                    <ListItemIcon>
                      <Icon>{i.is_answered?'done_outline':''}</Icon>
                    </ListItemIcon>
                    <ListItemText primary={i.title} />
                  </ListItem>
                )
              )
            }
        </Paper>
      </React.Fragment>
    )
  }
}
