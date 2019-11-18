function simulate(attribute, classname) {

    let query = `[${attribute}]`;
    classname = [` `, classname, ` `].join('');

    return get();


    async function get() {
        let mock = await fetch(`./json/mock.json`);
        let proposal = await mock.json();
        render(proposal);
        // console.log({ proposal });
        // debugger;
        return proposal;
    }

    function render(proposal) {
        let pendingTags = document.querySelectorAll(query);
        let x = pendingTags.length;
        while (x--) {
            let propertyName = pendingTags[x].getAttribute(attribute);
            pendingTags[x].className += classname;
            pendingTags[x].className = pendingTags[x].className.trim();
            pendingTags[x].textContent = eval(`proposal.${propertyName}`);
        }
    }
}