$(document).ready(function () {
    const backToLogin = (event) => {
        event.preventDefault();
        window.location.href = "../reading-reccomendations/index.html";

    }


    $(".back-to-login-link").click(backToLogin);

    const decimalToTime = (decimalNumber) => {
        const hrs = parseInt(Number(decimalNumber));
        const minutes = Math.round((Number(decimalNumber) - hrs) * 60)
        return hrs + " hours and " + minutes + " minutes.";
    }



    const retrieveDate = () => {
        const unformattedDate = new Date();
        const formattedDate = unformattedDate.getDate();
        if (formattedDate >= 4) {
            return formattedDate + "th";
        } else if (formattedDate === 3) {
            return formattedDate + "rd";
        } else if (formattedDate === 2) {
            return formattedDate + "nd";
        } else if (formattedDate === 1) {
            return formattedDate + "st";
        }
    }
    //add-books-form code start

    $("#add-books-form").css("display", "none");
    $("#output-box").css("visibility", "hidden");

    const unhideAddBookForm = (event) => {
        event.preventDefault();
        $("#add-books-form").css("display", "inline-block");
        $("#day-inputs").css("visibility", "hidden");

    }

    $("#add-books-link").click(unhideAddBookForm);

    const hideAddBookForm = (event) => {
        event.preventDefault();
        $("#add-books-form").css("display", "none");
        $("#day-inputs").css("visibility", "visible");
    }

    $("#exit-button").click(hideAddBookForm);

    const unhideOutputBox = (event) => {
        event.preventDefault();
        $("#output-box").css("visibility", "visible");
    }

    $("#sunday-button").add("#monday-button").add("#tuesday-button").add("#wednesday-button").add("#thursday-button").add("#friday-button").add("#saturday-button").click(unhideOutputBox);

    const bookList = {};
    const storedBooks = $.jStorage.get("localStorageBookList");
    const addBook = (event) => {
        event.preventDefault();
        const title = $("#book-title-input-field").val();
        const author = $("#author-name-input-field").val();
        const style = $(".style-select-box").val();
        const importance = $(".importance-select-box").val();
        console.log(storedBooks);
        let formattedStoredBooks = storedBooks ? storedBooks : {};
        formattedStoredBooks[title] = { title: title, author: author, style: style, importance: importance };
        $.jStorage.set("localStorageBookList", formattedStoredBooks);

    }


    $("#add-book-to-reading-list-button").click(addBook);





    const sortFunction = (a, b) => {
        if (b[3] === a[3]) {
            return 0;
        } else {
            return (b[3] < a[3]) ? -1 : 1;
        }
    }
    //Complicated Noteworthy Nonfiction


    const arrayOfComplicatedNoteworthyNonfictionBooks = [];

    const findAndSortComplicatedNoteworthyNonfiction = () => {
        let finalBooks;
        for (const book in storedBooks) {
            if (storedBooks[book].style == "complicated-noteworthy-nonfiction") {
                const tempBook = storedBooks[book];
                const isolatedValue = Object.values(tempBook);
                arrayOfComplicatedNoteworthyNonfictionBooks.push(isolatedValue);
                const sortedArrayByImportance = arrayOfComplicatedNoteworthyNonfictionBooks.sort(sortFunction);
                finalBooks = sortedArrayByImportance.slice(0, 5);
                //Question for Jon. Why did this not work with const or let but only with var

            }

        }

        return " Title: " + finalBooks[0][0] + " \xa0\xa0Author: " + finalBooks[0][1] + " \xa0\xa0Importance: \xa0 " + finalBooks[0][3] + "<br>"
            + " Title: " + finalBooks[1][0] + " \xa0\xa0Author: " + finalBooks[1][1] + " \xa0\xa0Importance: \xa0 " + finalBooks[1][3] + "<br>"
            + " Title: " + finalBooks[2][0] + " \xa0\xa0Author: " + finalBooks[2][1] + " \xa0\xa0Importance: \xa0 " + finalBooks[2][3] + "<br>"
            + " Title: " + finalBooks[3][0] + " \xa0\xa0Author: " + finalBooks[3][1] + " \xa0\xa0Importance: \xa0 " + finalBooks[3][3] + "<br>"
            + " Title: " + finalBooks[4][0] + " \xa0\xa0Author: " + finalBooks[4][1] + " \xa0\xa0Importance: \xa0 " + finalBooks[4][3];

    }

    // var readyForPrint = findAndSortCasualNonfiction();

    // const printComplicatedNoteorthyNonFiction = () => {
    //     for (var i = 0; i < readyForPrint.length; i++) {
    //     } for (var j = 0; readyForPrint[i].length; j++) {
    //         return " " + readyForPrint[i][j];
    //     }
    // }



    //Noteworthy Nonfiction
    const arrayOfNoteworthyNonfictionBooks = [];

    const findAndSortNoteworthyNonfiction = () => {

        for (var books in storedBooks) {
            if (storedBooks[books].style == "noteworthy-nonfiction") {
                const tempBooks = storedBooks[books];
                const isolatedValues = Object.values(tempBooks);
                arrayOfNoteworthyNonfictionBooks.push(isolatedValues);
                var sortedArray = arrayOfNoteworthyNonfictionBooks.sort(sortFunction);
                var finalBooks = sortedArray.slice(0, 5)


            }
        }
        return " Title: " + finalBooks[0][0] + " \xa0\xa0Author: " + finalBooks[0][1] + " \xa0\xa0Importance: \xa0 " + finalBooks[0][3] + "<br>"
            + " Title: " + finalBooks[1][0] + " \xa0\xa0Author: " + finalBooks[1][1] + " \xa0\xa0Importance: \xa0 " + finalBooks[1][3] + "<br>"
            + " Title: " + finalBooks[2][0] + " \xa0\xa0Author: " + finalBooks[2][1] + " \xa0\xa0Importance: \xa0 " + finalBooks[2][3] + "<br>"
            + " Title: " + finalBooks[3][0] + " \xa0\xa0Author: " + finalBooks[3][1] + " \xa0\xa0Importance: \xa0 " + finalBooks[3][3] + "<br>"
            + " Title: " + finalBooks[4][0] + " \xa0\xa0Author: " + finalBooks[4][1] + " \xa0\xa0Importance: \xa0 " + finalBooks[4][3];
    }

    //Casual Nonfiction
    const arrayOfCasualNonfictionBooks = [];

    const findAndSortCasualNonfiction = () => {

        for (var books in storedBooks) {
            if (storedBooks[books].style == "casual-nonfiction") {
                const tempBooks = storedBooks[books];
                const isolatedValues = Object.values(tempBooks);
                arrayOfCasualNonfictionBooks.push(isolatedValues);
                var sortedArray = arrayOfCasualNonfictionBooks.sort(sortFunction);
                var finalBooks = sortedArray.slice(0, 5)


            }
        }
        return " Title: " + finalBooks[0][0] + " \xa0\xa0Author: " + finalBooks[0][1] + " \xa0\xa0Importance: \xa0 " + finalBooks[0][3] + "<br>"
            + " Title: " + finalBooks[1][0] + " \xa0\xa0Author: " + finalBooks[1][1] + " \xa0\xa0Importance: \xa0 " + finalBooks[1][3] + "<br>"
            + " Title: " + finalBooks[2][0] + " \xa0\xa0Author: " + finalBooks[2][1] + " \xa0\xa0Importance: \xa0 " + finalBooks[2][3] + "<br>"
            + " Title: " + finalBooks[3][0] + " \xa0\xa0Author: " + finalBooks[3][1] + " \xa0\xa0Importance: \xa0 " + finalBooks[3][3] + "<br>"
            + " Title: " + finalBooks[4][0] + " \xa0\xa0Author: " + finalBooks[4][1] + " \xa0\xa0Importance: \xa0 " + finalBooks[4][3];
    }

    //Fiction
    const arrayOfFictionBooks = [];

    const findAndSortFiction = () => {

        for (var books in storedBooks) {
            if (storedBooks[books].style == "fiction") {
                const tempBooks = storedBooks[books];
                const isolatedValues = Object.values(tempBooks);
                arrayOfFictionBooks.push(isolatedValues);
                var sortedArray = arrayOfFictionBooks.sort(sortFunction);
                var finalBooks = sortedArray.slice(0, 5)


            }
        }
        return " Title: " + finalBooks[0][0] + " \xa0\xa0Author: " + finalBooks[0][1] + " \xa0\xa0Importance: \xa0 " + finalBooks[0][3] + "<br>"
            + " Title: " + finalBooks[1][0] + " \xa0\xa0Author: " + finalBooks[1][1] + " \xa0\xa0Importance: \xa0 " + finalBooks[1][3] + "<br>"
            + " Title: " + finalBooks[2][0] + " \xa0\xa0Author: " + finalBooks[2][1] + " \xa0\xa0Importance: \xa0 " + finalBooks[2][3] + "<br>"
            + " Title: " + finalBooks[3][0] + " \xa0\xa0Author: " + finalBooks[3][1] + " \xa0\xa0Importance: \xa0 " + finalBooks[3][3] + "<br>"
            + " Title: " + finalBooks[4][0] + " \xa0\xa0Author: " + finalBooks[4][1] + " \xa0\xa0Importance: \xa0 " + finalBooks[4][3];
    }

    //Short Stories and Comic Books
    const arrayOfShortStoriesAndComicBooks = [];

    const findAndSortShortStoriesAndComicBooks = () => {

        for (var books in storedBooks) {
            if (storedBooks[books].style == "short-story-or-comic-book") {
                const tempBooks = storedBooks[books];
                const isolatedValues = Object.values(tempBooks);
                arrayOfShortStoriesAndComicBooks.push(isolatedValues);
                var sortedArray = arrayOfShortStoriesAndComicBooks.sort(sortFunction);
                var finalBooks = sortedArray.slice(0, 5)


            }
        }
        return " Title: " + finalBooks[0][0] + " \xa0\xa0Author: " + finalBooks[0][1] + " \xa0\xa0Importance: \xa0 " + finalBooks[0][3] + "<br>"
            + " Title: " + finalBooks[1][0] + " \xa0\xa0Author: " + finalBooks[1][1] + " \xa0\xa0Importance: \xa0 " + finalBooks[1][3] + "<br>"
            + " Title: " + finalBooks[2][0] + " \xa0\xa0Author: " + finalBooks[2][1] + " \xa0\xa0Importance: \xa0 " + finalBooks[2][3] + "<br>"
            + " Title: " + finalBooks[3][0] + " \xa0\xa0Author: " + finalBooks[3][1] + " \xa0\xa0Importance: \xa0 " + finalBooks[3][3] + "<br>"
            + " Title: " + finalBooks[4][0] + " \xa0\xa0Author: " + finalBooks[4][1] + " \xa0\xa0Importance: \xa0 " + finalBooks[4][3];
    };



    const generateRecommendation = (dayOfWeek) => {
        const lowerCaseDayOfTheWeek = dayOfWeek.toLowerCase();
        const availableTime = $("." + lowerCaseDayOfTheWeek + "-time-input").val();


        if (availableTime >= 5 && $('#' + lowerCaseDayOfTheWeek + '-not-motivated').is(':checked')) {
            $("#empty-span-output").html(`<div>For this ${dayOfWeek}, the ${retrieveDate()} read:</div>
            <div>Complicated and Noteworthy Nonfiction for: ${decimalToTime(availableTime * 0.25)}</div>
            <div><br> Top Five Recommended Books</div>
            <div><br> ${findAndSortComplicatedNoteworthyNonfiction()}</div>`);
        } else if (availableTime >= 5 && $('#' + lowerCaseDayOfTheWeek + '-somewhat-motivated').is(':checked')) {
            $("#empty-span-output").html(`<div>For this ${dayOfWeek}, the ${retrieveDate()} read:</div>
            <div>Complicated and Noteworthy Nonfiction for: ${decimalToTime(availableTime * 0.5)}</div>
            <div><br> Top Five Recommended Books</div>
            <div><br> ${findAndSortComplicatedNoteworthyNonfiction()}</div>`);
        } else if (availableTime >= 5 && $('#' + lowerCaseDayOfTheWeek + '-motivated').is(':checked')) {
            $("#empty-span-output").html(
                `<div>For this ${dayOfWeek}, the ${retrieveDate()} read:</div>
                <div>Complicated and Noteworthy Nonfiction for: ${decimalToTime(availableTime * .75)}</div>
                <div><br> Top Five Recommended Books</div>
                <div><br> ${findAndSortComplicatedNoteworthyNonfiction()}</div>`
            );
        } else if (availableTime >= 5 && $('#' + lowerCaseDayOfTheWeek + '-very-motivated').is(':checked')) {
            $("#empty-span-output").html(`<div>For this ${dayOfWeek}, the ${retrieveDate()} read:</div>
            <div>Complicated and Noteworthy Nonfiction for: ${decimalToTime(availableTime * 1)}</div>
            <div><br> Top Five Recommended Books</div>
            <div><br> ${findAndSortComplicatedNoteworthyNonfiction()}</div>`);
        }
        //second input range
        else if (availableTime < 5 && availableTime >= 3 && $('#' + lowerCaseDayOfTheWeek + '-not-motivated').is(':checked')) {
            $("#empty-span-output").html(`<div>For this ${dayOfWeek}, the ${retrieveDate()} read:</div>
            <div>Noteworthy Nonfiction for: ${decimalToTime(availableTime * 0.25)}</div>
            <div><br> Top Five Recommended Books</div> 
            <div><br> ${findAndSortNoteworthyNonfiction()}</div>`);
        } else if (availableTime < 5 && availableTime >= 3 && $('#' + lowerCaseDayOfTheWeek + '-somewhat-motivated').is(':checked')) {
            $("#empty-span-output").html(`<div>For this ${dayOfWeek}, the ${retrieveDate()} read:</div>
            <div>Noteworthy Nonfiction for: ${decimalToTime(availableTime * 0.5)}
             <div><br> Top Five Recommended Books</div>
             <div><br> ${findAndSortNoteworthyNonfiction()}</div>`);
        } else if (availableTime < 5 && availableTime >= 3 && $('#' + lowerCaseDayOfTheWeek + '-motivated').is(':checked')) {
            $("#empty-span-output").html(`<div>For this ${dayOfWeek}, the ${retrieveDate()} read:</div>
            <div>Noteworthy Nonfiction for: ${decimalToTime(availableTime * .75)}
             <div><br> Top Five Recommended Books</div> 
             <div><br> ${findAndSortNoteworthyNonfiction()}</div>`);
        } else if (availableTime < 5 && availableTime >= 3 && $('#' + lowerCaseDayOfTheWeek + '-very-motivated').is(':checked')) {
            $("#empty-span-output").html(`<div>For this ${dayOfWeek}, the ${retrieveDate()} read:</div>
            <div>Noteworthy Nonfiction for:  ${decimalToTime(availableTime * 1)}
             <div><br> Top Five Recommended Books</div> 
             <div><br> ${findAndSortNoteworthyNonfiction()}</div>`);
            //third input range
        } else if (availableTime < 3 && availableTime >= 1 && $('#' + lowerCaseDayOfTheWeek + '-not-motivated').is(':checked')) {
            $("#empty-span-output").html(`<div>For this ${dayOfWeek}, the ${retrieveDate()} read:</div>
            <div>casual Nonfiction for: ${decimalToTime(availableTime * 0.25)}
             <div><br> Top Five Recommended Books</div> 
             <div><br> ${findAndSortCasualNonfiction()}</div>`);
        } else if (availableTime < 3 && availableTime >= 1 && $('#' + lowerCaseDayOfTheWeek + '-somewhat-motivated').is(':checked')) {
            $("#empty-span-output").html(`<div>For this ${dayOfWeek}, the ${retrieveDate()} read:</div>
            <div>casual Nonfiction for: ${decimalToTime(availableTime * 0.5)}
             <div><br> Top Five Recommended Books</div> 
             <div><br>  ${findAndSortCasualNonfiction()}</div>`);
        } else if (availableTime < 3 && availableTime >= 1 && $('#' + lowerCaseDayOfTheWeek + '-motivated').is(':checked')) {
            $("#empty-span-output").html(`<div>For this ${dayOfWeek}, the ${retrieveDate()} read:</div>
            <div>casual Nonfiction for: ${decimalToTime(availableTime * .75)}
             <div><br> Top Five Recommended Books</div> 
             <div><br>  ${findAndSortCasualNonfiction()}</div>`);
        } else if (availableTime < 3 && availableTime >= 1 && $('#' + lowerCaseDayOfTheWeek + '-very-motivated').is(':checked')) {
            $("#empty-span-output").html(`<div>For this ${dayOfWeek}, the ${retrieveDate()} read:</div>
            <div>casual Nonfiction for: ${decimalToTime(availableTime * 1)}
             <div><br> Top Five Recommended Books</div> 
             <div><br> ${findAndSortCasualNonfiction()}</div>`);
            //fourth input range
        } else if (availableTime < 1 && availableTime >= 0.5 && $('#' + lowerCaseDayOfTheWeek + '-not-motivated').is(':checked')) {
            $("#empty-span-output").html(`<div>For this ${dayOfWeek}, the ${retrieveDate()} read:</div>
            <div>Fiction for: ${decimalToTime(availableTime * 0.25)}
             <br> Pick your favorite subgenre! 
             <div><br> Top Five Recommended Books</div> 
             <div><br> ${findAndSortFiction()}</div>`);
        } else if (availableTime < 1 && availableTime >= 0.5 && $('#' + lowerCaseDayOfTheWeek + '-somewhat-motivated').is(':checked')) {
            $("#empty-span-output").html(`<div>For this ${dayOfWeek}, the ${retrieveDate()} read:</div>
            <div>Fiction for: ${decimalToTime(availableTime * 0.5)}
             <br> Pick your favorite subgenre! 
             <div><br> Top Five Recommended Books</div> 
             <div><br> ${findAndSortFiction()}</div>`);
        } else if (availableTime < 1 && availableTime >= 0.5 && $('#' + lowerCaseDayOfTheWeek + '-motivated').is(':checked')) {
            $("#empty-span-output").html(`<div>For this ${dayOfWeek}, the ${retrieveDate()} read:</div>
            <div>Fiction for: ${decimalToTime(availableTime * .75)}
             <br> Pick your favorite subgenre!
              <div><br> Top Five Recommended Books</div>
               <div><br> ${findAndSortFiction()}</div>`);
        } else if (availableTime < 1 && availableTime >= 0.5 && $('#' + lowerCaseDayOfTheWeek + '-very-motivated').is(':checked')) {
            $("#empty-span-output").html(`<div>For this ${dayOfWeek}, the ${retrieveDate()} read:</div>
            <div>Fiction for: ${decimalToTime(availableTime * 1)}
             <br> Pick your favorite subgenre! 
             <div><br> Top Five Recommended Books</div> 
             <div><br> ${findAndSortFiction()}</div>`);
            //fifth input range
        } else if (availableTime < 0.5 && availableTime > 0 && $('#' + lowerCaseDayOfTheWeek + '-not-motivated').is(':checked')) {
            $("#empty-span-output").html(`<div>For this ${dayOfWeek}, the ${retrieveDate()} read:</div>
            <div>a short story or a comic book for: ${decimalToTime(availableTime * 0.25)}
             <div><br> Top Five Recommended Books</div> 
             <div><br> ${findAndSortShortStoriesAndComicBooks()}</div>`);
        } else if (availableTime < 0.5 && availableTime > 0 && $('#' + lowerCaseDayOfTheWeek + '-somewhat-motivated').is(':checked')) {
            $("#empty-span-output").html(`<div>For this ${dayOfWeek}, the ${retrieveDate()} read:</div>
            <div>a short story or a comic book for: ${decimalToTime(availableTime * 0.5)}
             <div><br> Top Five Recommended Books</div> 
             <div><br> ${findAndSortShortStoriesAndComicBooks()}</div>`);
        } else if (availableTime < 0.5 && availableTime > 0 && $('#' + lowerCaseDayOfTheWeek + '-motivated').is(':checked')) {
            $("#empty-span-output").html(`<div>For this ${dayOfWeek}, the ${retrieveDate()} read:</div>
            <div>a short story or a comic book for: ${decimalToTime(availableTime * .75)}
             <div><br> Top Five Recommended Books</div> 
             <div><br> ${findAndSortShortStoriesAndComicBooks()}</div>`);
        } else if (availableTime < 0.5 && availableTime > 0 && $('#' + lowerCaseDayOfTheWeek + '-very-motivated').is(':checked')) {
            $("#empty-span-output").html(`<div>For this ${dayOfWeek}, the ${retrieveDate()} read:</div>
            <div>a short story or a comic book for: ${decimalToTime(availableTime * 1)}
             <div><br> Top Five Recommended Books</div> 
             <div><br> ${findAndSortShortStoriesAndComicBooks()}</div>`);
            //sixth input range
        } else if (availableTime == 0) {
            $("#empty-span-output").html("Ouch! Today looks too busy to read. I feel for you!");

        }

    };


    //add books form code end

    const sunday = (event) => {
        event.preventDefault();
        generateRecommendation("Sunday");
    };


    $("#sunday-button").click(sunday);

    const monday = (event) => {
        event.preventDefault();
        generateRecommendation("Monday");
    };

    $("#monday-button").click(monday);

    const tuesday = (event) => {
        event.preventDefault();
        generateRecommendation("Tuesday");
    };

    $("#tuesday-button").click(tuesday);

    const wednesday = (event) => {
        event.preventDefault();
        generateRecommendation("Wednesday");
    };

    $("#wednesday-button").click(wednesday);

    const thursday = (event) => {
        event.preventDefault();
        generateRecommendation("Thursday");
    }

    $("#thursday-button").click(thursday);

    const friday = (event) => {
        event.preventDefault();
        generateRecommendation("Friday");
    };

    $("#friday-button").click(friday);

    const saturday = (event) => {
        event.preventDefault();
        generateRecommendation("Saturday");
    }

    $("#saturday-button").click(saturday);




})
