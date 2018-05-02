$(document).ready(function () {
    const backToLogin = (event) => {
        event.preventDefault();
        window.location.href = "../../index.html";
    }
    $(".back-to-login-link").click(backToLogin);


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
    $("#sunday-button")
        .add("#monday-button").add("#tuesday-button")
        .add("#wednesday-button").add("#thursday-button")
        .add("#friday-button").add("#saturday-button")
        .click(unhideOutputBox);


    const storedBooks = $.jStorage.get("localStorageBookList");
    const addBookToLocalStorage = (event) => {
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
    $("#add-book-to-reading-list-button").click(addBookToLocalStorage);



    const sortFunction = (a, b) => {
        if (b[3] === a[3]) {
            return 0;
        } else {
            return (b[3] < a[3]) ? -1 : 1;
        }
    }

    const findTopFiveRecommendedBooks = (writingStyle) => {
        const arrayOfBooks = [];
        let top5Books;
        for (const book in storedBooks) {
            if (storedBooks[book].style == writingStyle) {
                const tempBook = storedBooks[book];
                const isolatedValue = Object.values(tempBook);
                arrayOfBooks.push(isolatedValue);
                const sortedArrayByImportance = arrayOfBooks.sort(sortFunction);
                top5Books = sortedArrayByImportance.slice(0, 5);
            }
        }

        const formattedTop5Books = top5Books.map((book, index) =>
            ` Title: ${book[index][0]} \xa0\xa0Author: ${book[index][1]} \xa0\xa0Importance: \xa0 ${book[index][3]}<br>`
        ).join();

        return formattedTop5Books;
    }


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

    const outputTimeAndTop5Books = (dayOfWeek, availableTime, motivationMultiplier, writingStyle) => {
        $("#empty-span-output").html(
            `<div>For this ${dayOfWeek}, the ${retrieveDate()} read:</div>
            <div>Complicated and Noteworthy Nonfiction for: ${decimalToTime(availableTime * motivationMultiplier)}</div>
            <div><br> Top Five Recommended Books</div>
            <div><br> ${findTopFiveRecommendedBooks(writingStyle)}</div>`
        );
    };


    const setupMotivationConditions = (availableTimeCondition, lowerCaseDayOfTheWeek, dayOfWeek, availableTime, writingStyle) => {
        if (availableTimeCondition && $('#' + lowerCaseDayOfTheWeek + '-not-motivated').is(':checked'))
            outputTimeAndTop5Books(dayOfWeek, availableTime, 0.25, writingStyle);
        else if (availableTimeCondition && $('#' + lowerCaseDayOfTheWeek + '-somewhat-motivated').is(':checked'))
            outputTimeAndTop5Books(dayOfWeek, availableTime, 0.5, writingStyle);
        else if (availableTimeCondition && $('#' + lowerCaseDayOfTheWeek + '-motivated').is(':checked'))
            outputTimeAndTop5Books(dayOfWeek, availableTime, 0.75, writingStyle);
        else if (availableTimeCondition && $('#' + lowerCaseDayOfTheWeek + '-very-motivated').is(':checked'))
            outputTimeAndTop5Books(dayOfWeek, availableTime, 1, writingStyle);
    };


    const generateRecommendation = (dayOfWeek) => {

        const lowerCaseDayOfTheWeek = dayOfWeek.toLowerCase();
        const availableTime = $("." + lowerCaseDayOfTheWeek + "-time-input").val();


        setupMotivationConditions(
            availableTime >= 5,
            lowerCaseDayOfTheWeek,
            dayOfWeek,
            availableTime,
            "complicated-noteworthy-nonfiction"
        );

        setupMotivationConditions(
            availableTime < 5 && availableTime >= 3,
            lowerCaseDayOfTheWeek,
            dayOfWeek,
            availableTime,
            "noteworthy-nonfiction"
        );

        setupMotivationConditions(
            availableTime < 3 && availableTime >= 1,
            lowerCaseDayOfTheWeek,
            dayOfWeek,
            availableTime,
            "casual-nonfiction"
        );

        setupMotivationConditions(
            availableTime < 1 && availableTime >= 0.5,
            lowerCaseDayOfTheWeek,
            dayOfWeek,
            availableTime,
            "fiction"
        );

        setupMotivationConditions(
            availableTime < 0.5 && availableTime > 0,
            lowerCaseDayOfTheWeek,
            dayOfWeek,
            availableTime,
            "short-story-or-comic-book"
        );



        if (availableTime == 0) {
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
