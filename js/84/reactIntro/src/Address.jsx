
export default function Address({address,city,state,zip}){
    return(
        <>
            <span >{address && `${address}, `} </span>
            <span>{city && `${city}, ` } {state && `${state}, `} {zip}</span>
        </>
    );
}