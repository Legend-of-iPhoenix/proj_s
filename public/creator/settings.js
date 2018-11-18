var settings = {
	"logosrc": "https://dummyimage.com/64x64",
	"menu": [{
			"id": "option1",
			"text": "Option 1",
			"isEnd": false,
			"hasChildren": true,
			"children": [{
					"text": "Sub-Option 1",
					"href": "#nowhere"
				},
				{
					"text": "Sub-Option 2",
					"href": "#nowhere"
				}
			]
		},
		{
			"id": "option2",
			"text": "Option 2",
			"isEnd": false,
			"hasChildren": false,
			"href": "#nowhere"
		},
		{
			"id": "option3",
			"text": "Option 3",
			"isEnd": false,
			"hasChildren": true,
			"children": [{
					"text": "Sub-Option 1",
					"href": "#nowhere"
				},
				{
					"text": "Sub-Option 2",
					"href": "#nowhere"
				},
				{
					"text": "Sub-Option 3",
					"href": "#nowhere"
				},
				{
					"text": "Sub-Option 4",
					"href": "#nowhere"
				},
				{
					"text": "Sub-Option 4",
					"href": "#nowhere"
				}
			]
		},
		{
			"id": "option4",
			"text": "Option 4",
			"isEnd": false,
			"hasChildren": false,
			"href": "#nowhere"
		},
		{
			"id": "options_end",
			"text": "More...",
			"isEnd": true,
			"children": [{
					"id": "option5",
					"text": "Sub-Option 1",
					"isEnd": false,
					"hasChildren": true,
					"children": [{
							"text": "Sub-Sub-Option 1",
							"href": "#nowhere"
						},
						{
							"text": "Sub-Sub-Option 2",
							"href": "#nowhere"
						},
						{
							"text": "Sub-Sub-Option 3",
							"href": "#nowhere"
						},
						{
							"text": "Sub-Sub-Option 4",
							"href": "#nowhere"
						}
					]
				},
				{
					"id": "option6",
					"text": "Sub-Option 2",
					"isEnd": false,
					"hasChildren": true,
					"children": [{
							"text": "Sub-Sub-Option 1",
							"href": "#nowhere"
						},
						{
							"text": "Sub-Sub-Option 2",
							"href": "#nowhere"
						},
						{
							"text": "Sub-Sub-Option 3",
							"href": "#nowhere"
						},
						{
							"text": "Sub-Sub-Option 4",
							"href": "#nowhere"
						}
					]
				}
			]
		}
	],
	"pages": [
		{
			"id": "page1",
			"style": "left_1",
			"text": [
				"Welcome!", 
				"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac aliquam erat, sed fermentum tortor. Pellentesque vulputate magna at sodales ultricies. Suspendisse id nisi lorem. Curabitur tempus ullamcorper felis ut commodo. Fusce viverra eu erat in scelerisque. Nunc nunc nibh, ultrices eget facilisis sed, semper condimentum dui. Duis congue luctus lectus, quis feugiat felis venenatis sed. Etiam vestibulum sit amet neque eget facilisis. Etiam odio magna, congue vel dolor a, elementum rutrum urna. Morbi elit justo, vulputate et suscipit vel, accumsan a ante. Sed commodo sollicitudin metus. Vivamus ac viverra elit. Ut tempor orci quis vulputate imperdiet. Vestibulum at feugiat dolor. Nulla neque nulla, vehicula non libero ut, consequat dignissim sapien. Sed condimentum porttitor eros, nec maximus turpis.</p>"
			],
			"imgs": [
				"https://dummyimage.com/350x350"
			]
		},
		{
			"id": "page2",
			"style": "right_2",
			"text": [
				"Heading",
				"<p>Nunc justo purus, ullamcorper a felis eget, sodales faucibus massa. Nunc a laoreet lorem, non iaculis felis. Ut ex ante, facilisis ultricies ornare vel, placerat a elit. Suspendisse tempor tortor sed lacus tincidunt, ut mollis nibh convallis. Integer nunc nunc, vehicula a semper non, placerat iaculis diam. Suspendisse varius ornare accumsan. Suspendisse ipsum nulla, euismod quis lobortis tincidunt, hendrerit eu elit. Phasellus sit amet maximus neque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus id tempus neque. Fusce commodo sollicitudin eros quis viverra.</p>"
			],
			"imgs": [
				"https://dummyimage.com/128x128",
				"https://dummyimage.com/128x128"
			]
		},
		{
			"id": "page3",
			"style": "right_parallax",
			"text": [
				"Heading",
				"<p>Pulvinar proin gravida hendrerit lectus a. Id consectetur purus ut faucibus pulvinar. Est velit egestas dui id ornare arcu odio. Ut etiam sit amet nisl purus in mollis. Consequat nisl vel pretium lectus quam id. Nibh tellus molestie nunc non blandit massa. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Quis imperdiet massa tincidunt nunc. Enim facilisis gravida neque convallis a cras semper auctor. Tellus molestie nunc non blandit massa enim nec. Cursus risus at ultrices mi tempus imperdiet nulla malesuada pellentesque. Auctor eu augue ut lectus arcu bibendum at varius. Odio aenean sed adipiscing diam donec adipiscing tristique.</p>"
			],
			"imgs": [
				"https://fakeimg.pl/300x300/000%2C05/000%2C255/?text=Layer1",
				"https://fakeimg.pl/300x300/000%2C05/000%2C255/?text=Layer2",
				"https://fakeimg.pl/300x300/000%2C05/000%2C255/?text=Layer3"
			]
		},
		{
			"id": "page4",
			"style": "blank",
			"text": [],
			"imgs": []
		}
	]
}