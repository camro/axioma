var presetModels = {
	"Social Trinity #1":
`object God
object Father
object Son
object HolySpirit

relationType object hasComponent object

God hasComponent Father
God hasComponent Son
God hasComponent HolySpirit
`,
	"Social Trinity #2":
`property God
object Father
object Son
object HolySpirit

Father hasProperty God
Son hasProperty God
HolySpirit hasProperty God
`,
	"Naive Modalism":
`object God

alias Father
alias Son
alias HolySpirit

property Fatherness
property Sonness
property HolySpiritness

God hasAlias Father
God hasAlias Son
God hasAlias HolySpirit

God hasProperty Fatherness
God hasProperty Sonness
God hasProperty HolySpiritness
`,
	"Nicene Creed":
`# I believe in one God, Father Almighty
object God
alias Father
God hasAlias Father

# And in one Lord Jesus Christ
object JesusChrist
property Lord
alias Son
JesusChrist hasAlias Son
JesusChrist hasProperty Lord

# ...the only-begotten Son of God
relationType object begets object
God begets JesusChrist

# ...true God of true God
property TrueGod
God hasProperty TrueGod
JesusChrist hasProperty TrueGod

# ...one essence with the Father
property Ousia
Father hasProperty Ousia
JesusChrist hasProperty Ousia
`,
	"Empty":
``,
};

var sel = document.getElementById('models');
	
for (const [key, value] of Object.entries(presetModels)) {

	var opt = document.createElement('option');
	opt.appendChild( document.createTextNode(key) );
	opt.value = value; 

	sel.appendChild(opt); 
}

function applySelection() {
    editor.getDoc().setValue(sel.options[sel.selectedIndex].value);
	updateGraph();
}

sel.addEventListener("change", function(){ 
	applySelection();
}); 

applySelection();