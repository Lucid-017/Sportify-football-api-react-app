import Load from "../components/assets/Rolling-1s-200px.svg"

const Spinner = ()=>{
    return(
        <div className="w-100 mt-20">
            <img className="text-center mx-auto"  src={Load} alt={<h1>Loading...</h1>} />
        </div>
    )
}
export default Spinner
