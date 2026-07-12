import Load from "../components/assets/Rolling-1s-200px.svg"

const Spinner = ()=>{
    return(
        <div className="w-full flex flex-col items-center justify-center py-20 gap-3">
            <img className="w-12 h-12" src={Load} alt="Loading" />
            <p className="text-ash-800 text-sm">Loading...</p>
        </div>
    )
}
export default Spinner
