const cubes = {
    height: 198,
    weight: 320,
    matrix: 2,
    cards: [
        {
            color: '#87D204',
            isShow: false,
        },
        {
            color: '#D27904',
            isShow: false,
        },
        {
            color: '#87D204',
            isShow: false,
        },
        {
            color: '#D27904',
            isShow: false,
        },
    ]    
}
   

$(document).ready(function () {


    $("#root").html("<div class='matrix'></div>");
    //$(".matrix").weight((cubes.weight + 24) * cubes.matrix).height((cubes.height + 24) * cubes.matrix);


    for (let i = 0; i < cubes.cards.length; i++) {
        //const e = cubes.cards[i];
        //console.log(e);

        $(".matrix").append("<div id='"  + i + "' class='cube'></div>");
    }
    for (let i = 0; i < cubes.cards.length; i++) {
        const e = cubes.cards[i];
        $("#cube_" + i).click(function () {
            const id = $("#cube_" + i).attr('id');
            $("#cube_" + i).css({
                "background-color": e.color
            });


            console.log(Number(id.replace('cube_', '')));

        });
    }
});