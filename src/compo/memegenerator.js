import React,{Component} from "react" 

 class MemeGenerator extends Component{
     constructor(){
         super()
         this.state={
             topText:"",
             bottomText:"",
             randomImg:"http://i.imgflip.com/1bij.jpg",
             allmemes:[]
         }
         this.handle=this.handle.bind(this)
         this.handleSubmit=this.handleSubmit.bind(this)
     }

     componentDidMount(){
         fetch("https://api.imgflip.com/get_memes")
         .then(response=>response.json())
         .then(response=>{
             const {memes}=response.data
             console.log(memes[0])
             this.setState({allmemes:memes})
         })
     }

     handle(event)
     {
        const {name,value}=event.target
        this.setState({[name]:value})
     }

     handleSubmit(event)
     {
        event.preventDefault()
        const randNum=Math.floor(Math.random()*this.state.allmemes.length)
        const randMemeImg=this.state.allmemes[randNum].url
        this.setState({randomImg:randMemeImg})
     }

     render(){
         return (
             <div>
             <form className="form-group" onSubmit={this.handleSubmit}>
                 <input type="text"
                 name="topText"
                 placeholder="Top Text"
                 className="form-control"
                 value={this.state.topText}
                 onChange={this.handle}
                 />
                 <br/>
                  <input type="text"
                 name="bottomText"
                 placeholder="Bottom Text"
                 value={this.state.bottomText}
                 className="form-control"
                 onChange={this.handle}
                 /><br/>
                 <button className="btn btn-outline-primary">Generate</button>
             </form>
             <div className="meme">
                 <img src={this.state.randomImg} alt=" "/>
                 <h2 className="top">{this.state.topText}</h2>
                <h2 className="bottom">{this.state.bottomText}</h2>
             </div>
             </div>

         )
     }
 }

 export default MemeGenerator
