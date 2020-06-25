'use strict';
require('dotenv').config();
const randomstring = require('randomstring');

const db = require('../../../database/models/index.js');

const optsUssd = {
  schema: {
    description: 'Ussd Endpoint Route for Farmpro App',
    tags: ['ussd'],
    querystring: {
      type: 'object',
      required: ['sessionId', 'code', 'phone'],
      properties: {
        sessionId: { type: 'string' },
        code: { type: 'string' },
        phone: { type: 'string', maxLength: 12, minLength: 12 },
        text: { type: 'string', default: '' },
      },
    },

    response: {
      200: {
        description: 'Success Response',
        content: 'text/plain',
        type: 'object',
      },
      400: {
        description: 'Error Response',
        content: 'application/json',
        type: 'object',
      },
    },
  },
};

module.exports = function (fastify, options, done) {
  fastify.get('/ussd', optsUssd, async (request, reply) => {
    let isRegistered = false;
    let message = '';
    let registration_level = 0;
    const sessionId = request.query.sessionId;
    const serviceCode = request.query.code;
    const phoneNumber = request.query.phone;
    const text = request.query.text;
    console.log('text-', text);
    let txt = request.query.text.split(/[*#]/);
    const txtlen = txt.length;
    console.log(txtlen);
    if (text === '') {
      // save ussd session to Database here
      await db.Ussds.create({
        sessionId: sessionId,
        serviceCode: serviceCode,
        level: 0,
      });
      // check if farmer is registered
      const farmer = await db.Farmers.findOne({
        where: {
          phone: phoneNumber,
        },
      });
      // if not registered prompt the farmer to register
      if (!farmer) {
        message = 'CON Welcome to Farm Pro \n';
        message += 'Reply with 1 to Register \n';
        message += '1: Register\n';
        // if registered let the farmer access the menus
      } else {
        const farmerName = farmer.firstName
          .split(' ')
          .map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase())
          .join(' ');
        isRegistered = true;
        message = `CON Welcome ${farmerName} to Farm Pro \n`;
        message += 'Menu\n';
        message += '1: My Farm\n';
        message += '2: Learn\n';
        message += '3: Loans\n';
        message += '4: My Profile\n';
      }
    } else if (parseInt(txt[0]) === 1 && isRegistered === false) {
      const ussd_level = await db.Ussds.findOne({
        where: {
          sessionId: sessionId,
        },
      });
      const level = ussd_level.level;
      switch (level) {
        // 1st registration First Name
        case 0:
          message = 'CON Enter your First Name\n';
          db.Ussds.update(
            { level: level + 1 },
            { returning: true, where: { sessionId: sessionId } }
          );
          break;

        // 2nd registration Last Name
        case 1:
          if (!txt[txtlen - 1].match(/^[A-Za-z]+$/)) {
            message = 'CON INVALID NAME \n';
            message += 'Enter your First Name\n';
          } else {
            message = 'CON Enter Last Name\n';
            db.Ussds.update(
              { level: level + 1, fname: txt[txtlen - 1] },

              { returning: true, where: { sessionId: sessionId } }
            );
          }
          break;

        // 3rd registration Last Name
        case 2:
          if (!txt[txtlen - 1].match(/^[A-Za-z ]+$/)) {
            message = 'CON INVALID NAME \n';
            message += 'Enter your Last Name\n';
          } else {
            message = 'CON Enter Your County Name\n';
            db.Ussds.update(
              { level: level + 1, lname: txt[txtlen - 1] },

              { returning: true, where: { sessionId: sessionId } }
            );
          }
          break;

        // 4th registration County Name
        case 3:
          if (!txt[txtlen - 1].match(/^[A-Za-z]+$/)) {
            message = 'CON INVALID COUNTY \n';
            message += 'Enter Correct County Name\n';
          } else {
            const county = await db.Counties.findOne({
              where: {
                countyName: txt[txtlen - 1].toUpperCase(),
              },
            });
            if (!county) {
              message = 'CON INVALID COUNTY \n';
              message += 'Enter Correct County Name\n';
            } else {
              message = `CON ${txt[txtlen - 1].toUpperCase()} County \n`;
              message += 'Enter Your Sub County Name\n';
              db.Ussds.update(
                { level: level + 1, county: txt[txtlen - 1] },

                { returning: true, where: { sessionId: sessionId } }
              );
            }
          }
          break;

        // 5th registration Sub County
        case 4:
          if (!txt[txtlen - 1].match(/^[A-Za-z ]+$/)) {
            message = `CON ${txt[txtlen - 1].toUpperCase()} County \n`;
            message += 'Enter Correct Sub County Name\n';
          } else {
            const countyIdx = await db.Ussds.findOne({
              where: {
                sessionId: sessionId,
              },
            });
            const subCounty = await db.Counties.findOne({
              where: {
                countyName: countyIdx.county.toUpperCase(),
                sub_county_name: txt[txtlen - 1].toUpperCase(),
              },
            });
            if (!subCounty) {
              message = `CON ${countyIdx.county.toUpperCase()} County \n`;
              message += 'Enter Correct Sub County Name\n';
            } else {
              db.Ussds.update(
                { level: level + 1, scounty: txt[txtlen - 1] },

                { returning: true, where: { sessionId: sessionId } }
              );
              message = `CON ${countyIdx.county.toUpperCase()} County ${txt[
                txtlen - 1
              ].toUpperCase()} Sub County \n`;
              message += 'Enter Your Ward Name\n';
            }
          }
          break;

        // 6th registration ward
        case 5:
          if (!txt[txtlen - 1].match(/^[A-Za-z ]+$/)) {
            message = 'CON INVALID WARD NAME\n';
            message += `${countyIdx.county.toUpperCase()} County ${txt[
              txtlen - 1
            ].toUpperCase()} Sub County \n`;
            message += 'Enter Correct Ward Name\n';
          } else {
            const countyIdx = await db.Ussds.findOne({
              where: {
                sessionId: sessionId,
              },
            });
            const ward = await db.Counties.findOne({
              where: {
                countyName: countyIdx.county.toUpperCase(),
                sub_county_name: countyIdx.scounty.toUpperCase(),
                ward_Name: txt[txtlen - 1].toUpperCase(),
              },
            });
            if (!ward) {
              message = `CON ${countyIdx.county.toUpperCase()} County County ${countyIdx.scounty.toUpperCase()} Sub County \n`;
              message += 'Enter Correct Ward Name\n';
            } else {
              db.Ussds.update(
                { level: level + 1, ward: txt[txtlen - 1] },

                { returning: true, where: { sessionId: sessionId } }
              );
              message = ' CON Choose Farm Activities\n';
              message += '1: Dairy Farm\n';
              message += '2: Crop Farm\n';
              message += '3: Mixed Farm\n';
            }
          }
          break;

        // 6th registration Farm Type
        case 6:
          if (!txt[txtlen - 1].match(/[1-3]/)) {
            message = 'CON INVALID SELECTION\n';
            message += ' CON Choose Farm Activities\n';
            message += '1: Dairy Farm\n';
            message += '2: Crop Farm\n';
            message += '3: Mixed Farm\n';
          } else {
            const farmOpts = parseInt(txt[txtlen - 1]);
            console.log('check', farmOpts);
            let farmActivity;
            switch (farmOpts) {
              case 1:
                farmActivity = 'Dairy Farm';
                break;
              case 2:
                farmActivity = 'Crop Farm';
                break;
              case 3:
                farmActivity = 'Mixed Farm';
                break;
            }

            db.Ussds.update(
              { level: level + 1, ftype: farmActivity },
              { returning: true, where: { sessionId: sessionId } }
            );
            message = ' CON Choose Your Gender\n';
            message += '1: Male\n';
            message += '2: Female\n';
            message += '3: Other\n';
          }
          break;

        // 6th registration Gender then Save Farmer
        case 7:
          if (!txt[txtlen - 1].match(/[1-3]/)) {
            message = 'CON INVALID SELECTION\n';
            message += ' Choose Your Gender\n';
            message += '1: Male\n';
            message += '2: Female\n';
            message += '3: Other\n';
          } else {
            let gender = '';
            switch (parseInt(txt[txtlen - 1])) {
              case 1:
                gender = 'Male';
                break;
              case 2:
                gender = 'Female';
                break;
              case 3:
                gender = 'Other';
                break;
            }

            const lussd = await db.Ussds.update(
              { level: level + 1, gender: gender },

              { returning: true, where: { sessionId: sessionId } }
            );
            if (lussd) {
              // generate reandom farmer number
              const farmerNo = randomstring.generate(7, true, {
                charset: '[A-Z 0-9]',
              });
              // generate pin for the farmer
              const pin = randomstring.generate(4, {
                charset: '[0-9]',
              });
              const regSession = await db.Ussds.findOne({
                where: {
                  sessionId: sessionId,
                },
              });
              if (regSession) {
                const newFarmer = await db.Farmers.create({
                  farmerNo: farmerNo,
                  firstName: regSession.fname.toUpperCase(),
                  lastName: regSession.lname.toUpperCase(),
                  phone: phoneNumber,
                  county: regSession.county.toUpperCase(),
                  sub_county: regSession.scounty.toUpperCase(),
                  ward: regSession.ward.toUpperCase(),
                  farmerType: regSession.ftype.toUpperCase(),
                  pin: pin,
                  gender: regSession.gender.toUpperCase(),
                });
                if (!newFarmer) {
                  message = 'END Registration Failed Try again';
                }
                message = 'END Registration Successful';
              }
            } else {
              message = 'END Registration Failed Try again';
            }
          }
          break;
        default:
          message = 'END Invalid Selection';
      }
      // No
    } else {
      message = 'END Invalid Selection';
    }
    reply.code(200).header('Content-Type', 'text/plain').send(message);
  });
  done();
};
