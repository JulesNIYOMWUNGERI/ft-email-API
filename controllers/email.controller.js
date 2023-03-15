const db = require("../models");
const Email = db.emails;
const Op = db.Sequelize.Op;
const sgMail = require('@sendgrid/mail');
require('dotenv').config();
const sendEmail = require('./utilities/sendemail')


/** const form = document.getElementById("myForm")
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formValues = {
        name: form.name.value,
        lname: form.lname.value,
        email: form.email.value,
        subject: form.subject.value,
        message: form.message.value
    }
})*/

//Set the API_KEY

sgMail.setApiKey(SENDGRID_API_KEY);

const msg = {
    to: ['bstwagir@mtu.edu',], // replace these with your email addresses
    from: 'Team B <bstwagir@hotmail.com>',
    subject: '🍩 Donuts, at the big donut 🍩',
    text: 'Fresh donuts are out of the oven. Get them while they’re hot!',
    html: '<p>Fresh donuts are out of the oven. Get them while they’re <em>hot!</em></p>',
  };
  
  /**sgMail.sendMultiple(msg).then(() => {
    console.log('emails sent successfully!');
  }).catch(error => {
    console.log(error);
  });*/
// Render the SendEmail page on the browser
  exports.render = (req, res) => {
    res.render("SendEmail")
}

//  Create, Save a new Email and save it on the database
exports.create = (req, res) => {
    // Validate request
    if (!req.body.to) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a email
    /**const newEmail = {
        to:form.name.value,
        from: 'Team B <bstwagir@hotmail.com>',
        subject: form.email.value,
        text: form.subject.value,
        html:"<p>"+text+"</p>"
    };*/
    const newEmail = {
        to: req.body.to,
        from: 'Team B <bstwagir@hotmail.com>',
        subject: req.body.subject,
        text: req.body.text,
        html: req.body.html,
    };

    console.log(newEmail)
    
    // Save Email in the database
    Email.create(newEmail)
        .then((email) => {
            console.log('Email created:', email.toJSON());
            res.send(email);
            //Send email to mailboxes 
            sgMail.sendMultiple(email).then(() => {
                console.log('emails sent successfully!');
              }).catch(error => {
                console.log(error);
              });
        })
        .catch((error) => {
            console.error('Error creating email:', error);
        });
};

// Retrieve all emails from the database.
exports.findAll = (req, res) => {
    const email = req.query.email;
    var condition = email ? { email: { [Op.iLike]: `%${email}%` } } : null;

    Email.findAll({ where: condition })
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving tutorials."
        });
    });
};

// Delete email by id from the database.

exports.delete = (req, res) => {
    const id = req.params.id;

    Email.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
};
