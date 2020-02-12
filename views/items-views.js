const items_view = ((data) => {
    let html = `
    <html>
    <body>
        Logged in as user: ${data.user_name}
        <form action="/logout" method="POST">
            <button type="submit">Log out</button>
        </form>`;


    data.items.forEach((item) => {
        html += item.text;
        html += `
            <form action="delete-item" method="POST">
                <input type="hidden" name="item_id" value="${item._id}">
                <button type="submit">Delete shopping item</button>
            </form>
            `;
    });

    html += `
        <form action="/add-item" method="POST">
            <input type="text" name="item">
            <button type="submit">Add shopping item</button>
        </form>
    </html>
    </body>
    `;
    return html;
});


const item_view = (data) => {
    let html = `
    <html>
    <body>
        item text: ${data.text}
    </body>
    </html>
    `;
    return html;
};

module.exports.items_view = items_view;
module.exports.item_view = item_view;