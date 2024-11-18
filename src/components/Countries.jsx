import Country from "./Country"

export default function Countries({ countries, isLoading }) {

    return(
        <>
            <div>
                <Country countries={countries} isLoading={isLoading} />
            </div>
        </>
    )
}