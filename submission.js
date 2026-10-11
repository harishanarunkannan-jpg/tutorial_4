// Creates a character using a name, optional cat name,
// and starting skills in the order fishing, mining, farming.
function createCharacter(charName, catName = null, initialSkills = [0, 0, 0]) {

    // Raises a valid skill by one, but does not let it go above 10.
    function levelUp(skill) {
        if (typeof this[skill] === "number" && this[skill] < 10) {
            this[skill]++;
        }
    }

    // Adds all given items to the end of the inventory.
    function grabItems(...items) {
        this.inventory.push(...items);
    }

    // Removes the first matching item if it is in the inventory.
    function dropItem(item) {
        let itemIndex = this.inventory.indexOf(item);

        if (itemIndex !== -1) {
            this.inventory.splice(itemIndex, 1);
        }
    }

    // Convert the starting skill values to numbers.
    let fishingSkill = Number(initialSkills[0]);
    let miningSkill = Number(initialSkills[1]);
    let farmingSkill = Number(initialSkills[2]);

    // Skills cannot start above level 10.
    fishingSkill = fishingSkill > 10 ? 10 : fishingSkill;
    miningSkill = miningSkill > 10 ? 10 : miningSkill;
    farmingSkill = farmingSkill > 10 ? 10 : farmingSkill;

    let character = {
        characterName: charName,
        fishingSkill,
        miningSkill,
        farmingSkill,
        inventory: [],
        levelUp,
        grabItems,
        dropItem
    };

    // Only add catName when it is not null.
    if (catName !== null) {
        character.catName = catName;
    }

    return character;
}


// Creates a sentence describing the character.
function describeCharacter(character) {

    // Add the three skill levels together.
    let total =
        character.fishingSkill +
        character.miningSkill +
        character.farmingSkill;

    let description = character.characterName;

    if (total < 10) {
        description += " is just starting out";
    } else {
        description += " is a skilled adventurer";
    }

    // Only include the cat if the property exists.
    if ("catName" in character) {
        description += ` and has a cat ${character.catName}`;
    }

    description += ".";

    console.log(description);

    return description;
}


/*
Testing code - leave commented out when submitting.

let player = createCharacter("New Player", null);

player.levelUp("farmingSkill");
console.log(player.farmingSkill);

player.grabItems("Apple", "Peach");
player.dropItem("Peach");

console.log(...player.inventory);

describeCharacter(player);
*/