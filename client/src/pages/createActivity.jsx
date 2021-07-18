const CreateActivity = () => {
    return ( 
        <div>
            <div>
                <h1>CREATE NEW ACTIVITY</h1>
            </div>
            <input type="text" placeholder="Name of activity"/>
            <input type="text" placeholder="Difficult"/>
            <input type="text" placeholder="Duration"/>
            <input type="text" placeholder="Season"/>

            {/* TODO: CHECKBOX PARA ESCOGER PAISES EN <SIMULTANEO */}
            
            <button>
                <h5>Create</h5>
            </button>

        </div> 
    );
}
 
export default CreateActivity;