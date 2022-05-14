const game = {
    height: 198 * .6,
    width: 320 * .6,
    matrix: 4,
    firstCard: null,
    failCount: 0,
    cards: [],
    getCardById: (cards, cardId) => {
        let card = null;
        cards.map(c => {
            if (c.id === cardId) {
                card = c;
            }
        });
        return card;
    },
    setIsShowTrueCards: (cards, arrayCardId) => {
        cards.map(c => {
            for (let i = 0; i < arrayCardId.length; i++) {
                const cardId = arrayCardId[i];
                if (c.id === cardId) {
                    c.isShow = true;
                }
            }
        });
    },
    isFinish: (cards) => {
        let isFinish = true;
        cards.map(c => {
            if (!c.isShow) {
                isFinish = false;
            }
        });
        return isFinish;
    }
}

game.cards = generateCards(game.matrix);

function generateCards(matrix) {
    const cards = []; 
    const countCards = (matrix * matrix) / 2;

    for (let i = 0; i < countCards; i++) {
        const e = {
            color: randomColorRGB(),
            isShow: false,
        };
        
        cards.push(e);
    }

    const oldArray = [...cards, ...cards];
    const newArray = [];

    for (let i = 0; i < oldArray.length; i++) {
        const oldE = oldArray[i];
        const newE = {
            id: i,
            color: oldE.color,
            isShow: false,
        };
        newArray.push(newE);
    }

    for (let i = 0; i < 64; i++) {
        newArray.sort(()=>Math.random()-0.5);
    }

    return newArray;
}

function randomColorRGB() {
    let colorString = 
    'rgb(' + randomNumber(0, 255) + 
    ', ' + randomNumber(0, 255) + 
    ', ' + randomNumber(0, 255) + 
    ')';
    return colorString;
}

function randomNumber(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}


$(document).ready(function () {

    $("#root")
    .html("<div class='matrix'></div>");
    $(".matrix")
    .width((game.width + 24) * game.matrix)
    .height((game.height + 24) * game.matrix);

    for (let i = 0; i < game.cards.length; i++) {
        const e = game.cards[i];

        $(".matrix")
        .append("<div id='cube_" + e.id + "'class ='cube'> </div>");
        $("#cube_" + e.id).css({
            "width": game.width,
            "height": game.height,
            "background-color": '#1A1A1A',
            "cursor": 'pointer',
        });
    }

    $("#root")
    .append("<div class='panel'></div>");

    for (let i = 0; i < game.cards.length; i++) {
        const e = game.cards[i];
        $("#cube_" + e.id).click(function () {
            const id = $("#cube_" + e.id).attr('id');

            $("#cube_" + e.id).css({
                "background-color": e.color,
                "cursor": 'default',
            });

            const card = 
                game.getCardById(
                    game.cards, 
                    Number(id.replace('cube_', ''))
                );
            console.log('!!!', game.firstCard, card);

            if (!card.isShow) {
                if (!game.firstCard || 
                    (!!game.firstCard && game.firstCard.id !== card.id)) {
                    if (!game.firstCard) {
                        game.firstCard = card;
                        console.log('1', game.firstCard);
                    } else if (!!game.firstCard) {
                        console.log('2', game.firstCard, card);
                        if (game.firstCard.color === card.color) {
                            console.log('Есть совпадение');
                            game.setIsShowTrueCards(
                                game.cards,
                                [
                                    game.firstCard.id,
                                    card.id
                                ]
                            );
                            game.firstCard = null;
                        } else {
                            console.log('Нет совпадения');
                            setTimeout(() => {
                                hideCard(game.firstCard.id);
                                hideCard(card.id);
                                game.firstCard = null;
                            }, 500);
                            game.failCount += 1;
                        }
                    }
                }
            }

            $(".panel").text(
                'Неудачная попытка:'
                + game.failCount
                + ','
                + (game.isFinish(game.cards)
                ? 'Игра завершина'
                : 'игра продолжается')
                );
        });
    }

    function hideCard(cardId) {
        $("#cube_" + cardId).css({
            "background-color": '#1A1A1A',
            "cursor": 'pointer',
        });
    }
});