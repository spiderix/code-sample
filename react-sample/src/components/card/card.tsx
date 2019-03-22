import * as React from 'react'

interface IProps {
  item:{
    content: string,
    title: string
  }
}

export default class Card extends React.Component<IProps> {
  public render() {
    const { content, title } = this.props.item;
    return (
      <div className="card">
        <h1>{ title }</h1>
        { content }
      </div>
    )
  }
}