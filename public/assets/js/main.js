/**
* Template Name: NiceAdmin - v2.5.0
* Template URL: https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach(e => e.addEventListener(type, listener))
    } else {
      select(el, all).addEventListener(type, listener)
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Sidebar toggle
   */
  if (select('.toggle-sidebar-btn')) {
    on('click', '.toggle-sidebar-btn', function(e) {
      select('body').classList.toggle('toggle-sidebar')
    })
  }

  /**
   * Search bar toggle
   */
  if (select('.search-bar-toggle')) {
    on('click', '.search-bar-toggle', function(e) {
      select('.search-bar').classList.toggle('search-bar-show')
    })
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Initiate tooltips
   */
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })

  /**
   * Initiate quill editors
   */
  if (select('.quill-editor-default')) {
    new Quill('.quill-editor-default', {
      theme: 'snow'
    });
  }

  if (select('.quill-editor-bubble')) {
    new Quill('.quill-editor-bubble', {
      theme: 'bubble'
    });
  }

  if (select('.quill-editor-full')) {
    new Quill(".quill-editor-full", {
      modules: {
        toolbar: [
          [{
            font: []
          }, {
            size: []
          }],
          ["bold", "italic", "underline", "strike"],
          [{
              color: []
            },
            {
              background: []
            }
          ],
          [{
              script: "super"
            },
            {
              script: "sub"
            }
          ],
          [{
              list: "ordered"
            },
            {
              list: "bullet"
            },
            {
              indent: "-1"
            },
            {
              indent: "+1"
            }
          ],
          ["direction", {
            align: []
          }],
          ["link", "image", "video"],
          ["clean"]
        ]
      },
      theme: "snow"
    });
  }

  /**
   * Initiate TinyMCE Editor
   */
  const useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isSmallScreen = window.matchMedia('(max-width: 1023.5px)').matches;

  tinymce.init({
    selector: 'textarea.tinymce-editor',
    plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons',
    editimage_cors_hosts: ['picsum.photos'],
    menubar: 'file edit view insert format tools table help',
    toolbar: 'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
    toolbar_sticky: true,
    toolbar_sticky_offset: isSmallScreen ? 102 : 108,
    autosave_ask_before_unload: true,
    autosave_interval: '30s',
    autosave_prefix: '{path}{query}-{id}-',
    autosave_restore_when_empty: false,
    autosave_retention: '2m',
    image_advtab: true,
    link_list: [{
        title: 'My page 1',
        value: 'https://www.tiny.cloud'
      },
      {
        title: 'My page 2',
        value: 'http://www.moxiecode.com'
      }
    ],
    image_list: [{
        title: 'My page 1',
        value: 'https://www.tiny.cloud'
      },
      {
        title: 'My page 2',
        value: 'http://www.moxiecode.com'
      }
    ],
    image_class_list: [{
        title: 'None',
        value: ''
      },
      {
        title: 'Some class',
        value: 'class-name'
      }
    ],
    importcss_append: true,
    file_picker_callback: (callback, value, meta) => {
      /* Provide file and text for the link dialog */
      if (meta.filetype === 'file') {
        callback('https://www.google.com/logos/google.jpg', {
          text: 'My text'
        });
      }

      /* Provide image and alt text for the image dialog */
      if (meta.filetype === 'image') {
        callback('https://www.google.com/logos/google.jpg', {
          alt: 'My alt text'
        });
      }

      /* Provide alternative source and posted for the media dialog */
      if (meta.filetype === 'media') {
        callback('movie.mp4', {
          source2: 'alt.ogg',
          poster: 'https://www.google.com/logos/google.jpg'
        });
      }
    },
    templates: [{
        title: 'New Table',
        description: 'creates a new table',
        content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>'
      },
      {
        title: 'Starting my story',
        description: 'A cure for writers block',
        content: 'Once upon a time...'
      },
      {
        title: 'New list with dates',
        description: 'New List with dates',
        content: '<div class="mceTmpl"><span class="cdate">cdate</span><br><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>'
      }
    ],
    template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
    template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
    height: 600,
    image_caption: true,
    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    noneditable_class: 'mceNonEditable',
    toolbar_mode: 'sliding',
    contextmenu: 'link image table',
    skin: useDarkMode ? 'oxide-dark' : 'oxide',
    content_css: useDarkMode ? 'dark' : 'default',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
  });

  /**
   * Initiate Bootstrap validation check
   */
  var needsValidation = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(needsValidation)
    .forEach(function(form) {
      form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })

  /**
   * Initiate Datatables
   */
  const datatables = select('.datatable', true)
  datatables.forEach(datatable => {
    new simpleDatatables.DataTable(datatable);
  })

  /**
   * Autoresize echart charts
   */
  const mainContainer = select('#main');
  if (mainContainer) {
    setTimeout(() => {
      new ResizeObserver(function() {
        select('.echart', true).forEach(getEchart => {
          echarts.getInstanceByDom(getEchart).resize();
        })
      }).observe(mainContainer);
    }, 200);
  }



  
// Define the areas for each city
var areas = {
  cairo: ["October", "Maadi", "Zayed", "AlRehab", "AlRehab", "Downtown", "New_Cairo", "Heliopolis", "Zamalek", "Garden_City", "ElRehab", "Heliopolis", "sheereton"],
  alex: ["Kom_ElDeka", "Miami ", "Moharam_Bek", "Sidi_Bishr", "Sidi_Gaber", "Smouha", "ElSoyof", "Bahary"],
  Giza: ["Agouza ", "Dokki ", "Warraq", "Ahrâm", "Ṭalbiyya"]
};

// Get references to the select elements
var citySelect = document.getElementById("city");
var areaSelect = document.getElementById("area");

// Function to populate the area select based on the selected city
function populateAreas() {
  // Get the selected city value
  var selectedCity = citySelect.value;
  
  // Clear the area select
  areaSelect.innerHTML = "";
  
  // Create the default area option
  var defaultOption = document.createElement("option");
  defaultOption.text = "-- Choose a area --";
  areaSelect.add(defaultOption);
  
  // Add the options for the selected city
  for (var i = 0; i < areas[selectedCity].length; i++) {
    var option = document.createElement("option");
    option.value = areas[selectedCity][i];
    option.text = areas[selectedCity][i];
    option.selected = true;
    areaSelect.add(option);
  }
}

// Populate the areas select for the default city when the page loads
populateAreas();

// Call the populateareas function when the city select is changed
citySelect.addEventListener("change", populateAreas);




})();


document.getElementById('images').addEventListener('change', function() {
  // Get the selected files
  var files = this.files;
  // Loop through the files
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    // Validate file type and size
    var fileType = file.type;
    var fileSize = file.size;
    if (!fileType.includes('image/')) {
      alert('File must be a JPEG, PNG, or GIF image.');
      this.value = '';
      return;
    }
    if (fileSize > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB.');
      this.value = '';
      return;
    }
    // Create a new FileReader object
    let reader = new FileReader();
    // Listen for when the FileReader is done loading the file
    reader.addEventListener('load', function() {
      // Create a new image element with the loaded data
      let preview = document.createElement('img');
      preview.src = reader.result;
      preview.alt = '';
      preview.className = 'col-6 col-md-4 col-lg-3 mb-3';
      // Add the image element to the preview container
      document.getElementById('preview-images').appendChild(preview);
      document.getElementById('preview-container').style.display = 'block';
    });
    // Read the file as a data URL
    reader.readAsDataURL(file);
  }
});


// Listen for click on remove images button
document.getElementById('remove-images').addEventListener('click', function() {
  // Clear the input field and remove all preview images
  document.getElementById('images').value = '';
  document.getElementById('preview-images').innerHTML = '';
  document.getElementById('preview-containerMenu').style.display = 'none';
});



document.getElementById('images-Menu').addEventListener('change', function() {
  // Get the selected files
  var files = this.files;
  // Loop through the files
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    // Validate file type and size
    var fileType = file.type;
    var fileSize = file.size;
    if (!fileType.includes('image/')) {
      alert('File must be a JPEG, PNG, or GIF image.');
      this.value = '';
      return;
    }
    if (fileSize > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB.');
      this.value = '';
      return;
    }
    // Create a new FileReader object
    let reader = new FileReader();
    // Listen for when the FileReader is done loading the file
    reader.addEventListener('load', function() {
      // Create a new image element with the loaded data
      let preview = document.createElement('img');
      console.log(preview, reader);
      preview.src = reader.result;
      preview.alt = '';
      preview.className = 'col-6 col-md-4 col-lg-3 mb-3';
      // Add the image element to the preview container
      document.getElementById('preview-images-Menu').appendChild(preview);
      document.getElementById('preview-container-Menu').style.display = 'block';
    });
    // Read the file as a data URL
    reader.readAsDataURL(file);
  }
});
// Listen for click on remove images button
document.getElementById('remove-images-Menu').addEventListener('click', function() {
  // Clear the input field and remove all preview images
  document.getElementById('remove-images-Menu').value = '';
  document.getElementById('preview-images-Menu').innerHTML = '';
  document.getElementById('preview-container-Menu').style.display = 'none';
});




// Get the popup form
const requestPopup = document.getElementById("request-popup");

// Get the button that opens the popup form
const openRequestButton = document.querySelectorAll(".open-review-popup");

// Get the elements for the tabs
const tabLinks1 = requestPopup.querySelectorAll(".nav-link");
const tabContents1 = requestPopup.querySelectorAll(".tab-pane");


// Function to open the popup form
openRequestButton.forEach(function(openRequestButton) {
    openRequestButton.addEventListener("click", function() {
        requestPopup.style.display = "block";
    });
    });
// Function to close the popup form
function closeForm1() {
  requestPopup.style.display = "none";
}

function rejectRequest() {

        // TODO: handle the request data (e.g. send it to the server and manage state)
        // Add code to accept the booking request here
          alert('request Rejected Done');

        requestPopup.style.display = "none"; // close the pop-up after accepting the form

}

function acceptRequest() {

    // TODO: handle the request data (e.g. send it to the server and manage state)
    // Add code to accept the booking request here
      alert('request Accepted Done');

    requestPopup.style.display = "none"; // close the pop-up after accepting the form

}


// Function to switch between tabs
function openTab1(evt1) {
    // Prevent the default action of the link
    evt1.preventDefault();
  
    // Hide all tab contents
    tabContents1.forEach((tab) => {
      tab.classList.remove("active");
    });
  
    // Remove the "active" class from all tab links
    tabLinks1.forEach((link) => {
      link.classList.remove("active");
    });
  
    // Show the current tab content
    const currentTab = requestPopup.querySelector(evt1.currentTarget.getAttribute("href"));
    currentTab.classList.add("active");
  
    // Add the "active" class to the current tab link
    evt1.currentTarget.classList.add("active");
  }
  
  // Add click event listeners to tab links
  tabLinks1.forEach((link) => {
    link.addEventListener("click", openTab1);
  });

// Add click event listener to close button
document.querySelector(".close").addEventListener("click", closeForm1);

// Add click event listener to cancel button
document.querySelector(".confirm").addEventListener("click", acceptRequest);

// Add click event listener to cancel button
document.querySelector(".rejected").addEventListener("click", rejectRequest);




