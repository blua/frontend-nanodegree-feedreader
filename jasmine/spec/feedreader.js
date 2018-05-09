/* feedreader.js
*
* This is the spec file that Jasmine will read and contains
* all of the tests that will be run against your application.
*/

/* We're placing all of our tests within the $() function,
* since some of these tests may require DOM elements. We want
* to ensure they don't run until the DOM is ready.
*/
$(function() {

	// Ensure allFeeds variable is defined
	describe('RSS Feeds', function() {

		it('are defined', function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});

		/* Loop through each feed in the allFeeds object
		* and ensure it has a URL defined and that URL is not empty.
		*/
		it('have URLs', function() {
			allFeeds.forEach(function (feed) {
			expect(feed.url).toBeDefined();
			expect(feed.url.length).not.toBe(0);
			});
		})

		/* Loop through each feed in the allFeeds object
		* and ensure it has a name defined and that name is not empty.
		*/
		it('have names', function() {
			allFeeds.forEach(function (feed) {
			expect(feed.name).toBeDefined();
			expect(feed.name.length).not.toBe(0);
			});
		});
	});

	describe('The menu', function() {

		// Ensure the menu element is hidden by default.
		it('is hidden by default', function() {
			expect($('body').attr('class')).toContain('menu-hidden');
		});

		/* Ensure the menu changes visibility when the menu icon is clicked:
		* the menu displays when clicked and hides when clicked again.
		*/

		it('toggles when icon is clicked', function() {
			$('.menu-icon-link').click();
			expect($('body').attr('class')).not.toContain('menu-hidden');
			$('.menu-icon-link').click();
			expect($('body').attr('class')).toContain('menu-hidden');
		});
	});

	describe('Initial entries', function() {

		/* Ensures when the loadFeed function is called and completes its work,
		* there is at least a single .entry element within the .feed container.
		*/
		beforeEach(function(done) {
			loadFeed(0, function() {
				done();
			});
		});

		it('at least one is loaded', function(done) {
			loadFeed(0);
			expect($('.feed .entry').length).not.toBe(0);
			done();
		});
	});

	describe('New feed selection', function() {

		/* Ensure when a new feed is loaded by the loadFeed function
		* the content actually changes.
		*/

		let oldContent;

		beforeEach(function(done) {
			loadFeed(0, function() {
				oldContent = $('.feed').html();
				done();
			});
		});

		it('changes content', function(done) {
			loadFeed(1, function() {
				const newContent = $('.feed').html();
				expect(oldContent).not.toEqual(newContent);
				done();
			});
		});
	});
}());
