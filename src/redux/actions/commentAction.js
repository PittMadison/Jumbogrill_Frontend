const changeArray = (event, object) => {

    let id = Number(event.target.id);

    let newArray = object.results.map(el =>{
        if (el.id === Number(id)) {
            return {...el, is_on: !el.is_on}
        } else return el;
    })

    return {...object, results: newArray};
}

export const commentToggle = (event, object) => ({
    type: "COMMENT",
    data: changeArray(event, object)
})