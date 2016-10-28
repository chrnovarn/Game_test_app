$(document).ready(function () {

    bindFirstViewEvent();

    //hidden the third view of the system
    $("#game_victory").toggle();

    //Creates the Second view calling PHP files via AJAX and it generates the mall of the game.
    function createSecondView() {

        //Function that create the click event of each cell
        function bindTableEvents() {
            $("[data-user]").on({
                click: function () {
                    cellSelected($(this).data("user"), $(this).html());
                }
            })
        };

        $.ajax({
            data: {},
            type: "GET",
            dataType: "JSON",
            url: "php/ini_table.php",
        })
         //Accessed with the first response of the server
        .success(function (response) {
            if (response.success) {
                var output = "<tbody>";
                for (var a = 0; a < 5; a++) {
                    output += '<tr>';
                    for (var b = 0; b < 5; b++) {
                        selectedCell = "";
                        if ((((a * 5) + b) + 1) == response.data[((a * 5) + b)]) selectedCell="correctCell";
                        output += '<td class="gameCell btn-default ' + selectedCell + '" data-user="' + ((a * 5) + b) + '">' + response.data[((a * 5) + b)] + '</td>';
                    }
                    output += '</tr>';
                }
                output += '<tbody>';

                $("#game_table").html(output);
            }
        })
        //If any error ocurs with the ajax call.
        .error(function (jqXHR, textStatus, errorThrown) {

            alert(jqXHR.responseText + "HTTP Error: " + errorThrown + " | Error Message: " + textStatus);

        })
         //that method it is accessed at the end of success
        .complete(function (jqXHR, textStatus) {
            bindTableEvents();
        });

        //Handle each one of the table's cells events
        //It's important manage each one separated
        

    }
    //Creating of First view of the website
    function bindFirstViewEvent() {
        $("#sendFirstView").on({
            click: function () {
                if (typeof (Storage) !== "undefined") {
                    // Code for localStorage/sessionStorage.
                    if ($('#inputName').val() != "" && $('#inputEmail').val() != "") {
                        localStorage.setItem("name", $('#inputName').val());
                        localStorage.setItem("email", $('#inputEmail').val());
                        $("#game_form").toggle();
                        createSecondView();
                    } else {
                        // Sorry! You must put on Name and Email
                    } 
                } else {
                    // Sorry! No Web Storage support..
                }
            }
        });
    }
    indexAux = -1;
    indexCell = -1;
    //Generating the third view of the app
    //and hidden the others
    function sendResultVictory(result) {
        $("#game_table").toggle();
        $("#game_victory").toggle();
        $("#nameLabel").html(localStorage.getItem("name"));
        $("#scoreLabel").html(result);
        //Handle of eventClicktbutton on the third view
        $("#retryGame").on({
            click: function () {
                createSecondView();
                $("#game_table").toggle();
                $("#game_victory").toggle();
            }
        })
    }

    // MAIN FUNTCION OF THE THIRD VIEW
    // CALLING execute.php via AJAX and swaping the CELLS
    function cellSelected(indexCell,dataCell) {
        //none cell selected
        if (indexAux == -1) {
            //cambiar estilo de la clase a clase seleccionada.
            indexAux = indexCell;
            $("[data-user='" + indexCell + "']").addClass("btn-success");
        }
        //The Cell was selected
        else if (indexAux == indexCell) {
            //cambiar estilo de la clase a clase DESseleccionada.
            $("[data-user='" + indexCell + "']").removeClass("btn-success");
            indexAux = -1;
        }
        // Second position was selected
        else {

            $.ajax({
                data: { indexCell, indexAux },
                type: "POST",
                dataType: "JSON",
                url: "php/execute.php",
            })
            .success(function (response) {
                if (response.success) {
                    //After the swap in the server side, We must Make the changes in the HTML with the 

                    $("[data-user='" + indexCell + "']").removeClass("btn-success");
                    $("[data-user='" + indexAux + "']").removeClass("btn-success");
                    valueAux = -1;
                    valueCell = -1;

                    //Storing temporatly the variables
                    $("[data-user]").each(function (index, element) {
                        if ($(element).data("user") == indexAux) valueAux = $(element).text();
                        if ($(element).data("user") == indexCell) valueCell = $(element).text();
                    });

                    //Swaping the cells
                    $("[data-user]").each(function (index, element) {
                        if ($(element).data("user") == indexAux) {
                            $(element).text(valueCell);
                            //Aplaying the style, correctCell
                            if ((indexAux + 1) == valueCell) $(element).addClass("correctCell");
                            else $(element).removeClass("correctCell");
                        }
                        if ($(element).data("user") == indexCell){
                            $(element).text(valueAux);
                            //Aplaying the style, correctCell
                            if ((indexCell + 1) == valueAux) $(element).addClass("correctCell");
                            else $(element).removeClass("correctCell");
                        }


                    });
                    //Rewrite styles
                    indexCell = -1;
                    indexAux = -1;
                    valueAux = -1;
                    valueCell = -1;
                    if (response.victory) {
                        sendResultVictory(response.score);
                    }
                }
            })
            .error(function (jqXHR, textStatus, errorThrown) {

                alert(jqXHR.responseText + "HTTP Error: " + errorThrown + " | Error Message: " + textStatus);

            })
            
        }
    }
});
        
        
     