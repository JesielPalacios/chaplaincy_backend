import CryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken'
import UserSchema from '../models/User'
import { encryptPassword } from './user.controller'

/**
 * Controlador del inicio de sesión.
 *
 * Aquí se realizan todos los proecsos de acuerdo al inicio de sesión.
 *
 * @constructor
 * @param {Request} req - Objeto de petición.
 * @param {Response} res - Objeto de respuesta de la petición.
 */

async function logIn(req, res) {
  if (!(req.body.email && req.body.password)) {
    res.status(400).json({ mensaje: 'Some credentials are missing' })
  } else {
    try {
      const user = await UserSchema.findOne({
        email: req.body.email
      })

      if (!user) {
        res.status(401).json('Wrong email')
      } else {
        const hashedPassword = CryptoJS.AES.decrypt(
          user.password,
          process.env.PASS_SEC
        )

        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)

        const inputPassword = req.body.password

        if (originalPassword != inputPassword) {
          res.status(401).json('Wrong password')
        } else {
          const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SEC, {
            expiresIn: '8h'
          })

          const { password, ...others } = user._doc
          res.status(200).json({ ...others, accessToken })
        }
      }
    } catch (err) {
      res.status(500).json(err)
    }
  }
}

async function changePassword(req, res) {
  const { oldPassword, newPassword } = req.body
  let user

  if (!(oldPassword && newPassword)) {
    res.status(400).json({
      message: 'Old and new password are needed.'
    })
  }

  try {
    user = await UserSchema.findById({ id: req.user.id })
  } catch (e) {
    res.status(400).json({ message: 'Something is wrong' })
  }

  if (encryptPassword(req.body.oldPassword) != user.password) {
    res.status(401).json({ message: 'Check your old password.' })
  } else {
    user.password = encryptPassword(req.body.oldPassword)

    await user.save()

    res.json({ message: 'Password changed successfully.' })
    try {
      // send mail with defined transport object
      await transporter.sendMail({
        // from: `"Cambio de contraseña 👻"<${account.user}>`, // sender address
        from: `"Hackathon UNAC 🔥"<${account.user}>`, // sender address
        to: user.email, // list of receivers
        subject: 'Alerta de seguridad', // Subject line
        // text: 'Hello world? plain text body', // plain text body
        // html: '<b>Hello world? html body</b>', // html body
        html: (await passwordChangedSuccessful(user.nombre)).toString()
      })
      console.log(`Sent successfully to ${user.correo}`)
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: 'Algo va mal.', error })
    }
  }
}

export default { logIn, changePassword }

const passwordChangedSuccessful = async (nombre) => {
  return `<!doctype html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en"><head><meta charset="UTF-8"><meta content="width=device-width,initial-scale=1" name="viewport"><meta name="x-apple-disable-message-reformatting"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta content="telephone=no" name="format-detection"><title></title><link href="https://fonts.googleapis.com/css?family=Lato:400,400i,700,700i" rel="stylesheet"><link rel="stylesheet" href="style.css"></head><body><div class="es-wrapper-color"><table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0"><tbody><tr class="gmail-fix" height="0"><td><table width="610" cellspacing="0" cellpadding="0" border="0" align="center"><tbody><tr><td cellpadding="0" cellspacing="0" border="0" style="line-height: 1px; min-width: 610px;" height="0"><img src="https://tnxxhv.stripocdn.email/content/guids/CABINET_837dc1d79e3a5eca5eb1609bfe9fd374/images/41521605538834349.png" style="display: block; max-height: 0px; min-height: 0px; min-width: 610px; width: 610px;" alt width="610" height="1"></td></tr></tbody></table></td></tr><tr><td class="esd-email-paddings" valign="top"><table class="esd-header-popover es-content" cellspacing="0" cellpadding="0" align="center"><tbody><tr><td class="esd-stripe" style="background-color: #1972a4;" esd-custom-block-id="6340" align="center" bgcolor="#1972a4"><table class="es-content-body" style="background-color: transparent;" width="610" cellspacing="0" cellpadding="0" align="center" bgcolor="rgba(0, 0, 0, 0)"><tbody><tr><td class="esd-structure es-p15t es-p15b es-p20r es-p20l" style="background-color: transparent;" bgcolor="transparent" align="left"><!--[if mso]><table width="570" cellpadding="0" cellspacing="0"><tr><td width="275" valign="top"><![endif]--><table class="es-left" cellspacing="0" cellpadding="0" align="left"><tbody><tr><td class="es-m-p20b esd-container-frame" width="275" align="left"><table width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td class="esd-block-text es-m-txt-c es-infoblock" align="right"><p></p></td></tr></tbody></table></td></tr></tbody></table><!--[if mso]></td><td width="20"></td><td width="275" valign="top"><![endif]--><table class="es-right" cellspacing="0" cellpadding="0" align="right"><tbody><tr><td class="esd-container-frame" width="275" align="left"><table width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td class="esd-block-text es-m-txt-c es-infoblock" align="right"><p></p></td></tr><tr><td class="esd-block-text es-m-txt-c es-infoblock" align="right"><p></p></td></tr><tr><td class="esd-block-text es-m-txt-c es-infoblock" align="right"><p></p></td></tr></tbody></table></td></tr></tbody></table><!--[if mso]></td></tr></table><![endif]--></td></tr><tr><td class="esd-structure es-p15t es-p15b es-p20r es-p20l" style="background-color: transparent;" bgcolor="transparent" align="left"><!--[if mso]><table width="570" cellpadding="0" cellspacing="0"><tr><td width="275" valign="top"><![endif]--><table class="es-left" cellspacing="0" cellpadding="0" align="left"><tbody><tr><td class="es-m-p20b esd-container-frame" width="275" align="left"><table width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td class="esd-block-image es-p5t es-m-txt-c" align="center" style="font-size: 0px;"><a target="_blank" href="https://www.hackathon-unac.herokuapp.com"><img src="https://tnxxhv.stripocdn.email/content/guids/CABINET_028bf426bbc41c84c8c6f20a99818831/images/6484671851_ccd332ae89a54b188c94c8d739145ffb.png" alt style="display: block;" width="275"></a></td></tr></tbody></table></td></tr></tbody></table><!--[if mso]></td><td width="20"></td><td width="275" valign="top"><![endif]--><table class="es-right" cellspacing="0" cellpadding="0" align="right"><tbody><tr><td class="esd-container-frame" width="275" align="left"><table width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td class="esd-block-text es-m-txt-c" align="right"><p style="color: #ffffff;">+57 1234567890</p><p style="color: #ffffff;">www.hackathon-unac.herokuapp.com</p><p style="color: #ffffff;"><br></p></td></tr></tbody></table></td></tr></tbody></table><!--[if mso]></td></tr></table><![endif]--></td></tr><tr><td class="esd-structure" align="left"><table width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td class="esd-container-frame" width="610" valign="top" align="center"><table style="background-color: #ffffff; border-radius: 4px; border-collapse: separate;" width="100%" cellspacing="0" cellpadding="0" bgcolor="#ffffff"><tbody><tr><td class="esd-block-text es-p35t es-p5b es-p30r es-p30l es-infoblock" align="center"><h1 style="font-size: 34px;">Contraseña cambiada exitosamente</h1></td></tr><tr><td class="esd-block-spacer es-p5t es-p5b es-p20r es-p20l es-infoblock" bgcolor="#ffffff" align="center" style="font-size:0"><table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td style="border-bottom: 1px solid #ffffff; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%; height: 1px; width: 100%; margin: 0px;"></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><table class="es-content" cellspacing="0" cellpadding="0" align="center"><tbody><tr><td class="esd-stripe" align="center" bgcolor="#1972a4" style="background-color: #1972a4;"><table class="es-content-body" style="background-color: transparent;" width="610" cellspacing="0" cellpadding="0" align="center"><tbody><tr><td class="esd-structure" align="left"><table width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td class="esd-container-frame" width="610" valign="top" align="center"><table style="border-radius: 4px; border-collapse: separate; background-color: #ffffff;" width="100%" cellspacing="0" cellpadding="0" bgcolor="#ffffff"><tbody><tr><td class="esd-block-text es-p20t es-p20b es-p30r es-p30l es-m-txt-l" bgcolor="#ffffff" align="left"><p>Su contraseña se ha cambiado de manera exitosa, a continuación puede dar click en el botón de abajo para iniciar sesión en la plataforma de Hackathon UNAC.</p></td></tr><tr><td class="esd-block-button es-p10" align="center"><span class="es-button-border" style="background: #e7c712;"><a href="https://www.hackathon-unac.herokuapp.com/login" class="es-button es-button-1638994636811" target="_blank" style="background: #e7c712; border-color: #e7c712; border-width: 15px 30px;">Iniciar sesión</a></span></td></tr><tr><td class="esd-block-text es-p20t es-p30r es-p30l es-m-txt-l" align="left"><p>Si usted no fue quien cambió su contraseña la contraseña para ${nombre}, es posible que otra persona esté usando su cuenta. Revisa y proteja su cuenta ahora.</p></td></tr><tr><td class="esd-block-button es-p10" align="center"><span class="es-button-border" style="background: #e7c712;"><a href="https://www.hackathon-unac.herokuapp.com/recuperar-contrasena" class="es-button es-button-1639006982202" target="_blank" style="border-width: 15px 30px; background: #e7c712; border-color: #e7c712;">Recuperar cuenta</a></span></td></tr><tr><td class="esd-block-text es-p20t es-p30r es-p30l es-m-txt-l" align="left"><p>Si tiene alguna pregunta, solo responda este correo electrónico; siempre estaremos encantados de ayudarlo.</p></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><table class="es-content" cellspacing="0" cellpadding="0" align="center"><tbody><tr><td class="esd-stripe" align="center" bgcolor="#1972a4" style="background-color: #1972a4;"><table class="es-content-body" style="background-color: transparent;" width="610" cellspacing="0" cellpadding="0" align="center"><tbody><tr><td class="esd-structure" align="left"><table width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td class="esd-container-frame" width="610" valign="top" align="center"><table width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td class="esd-block-spacer es-p10t es-p20b es-p20r es-p20l" align="center" style="font-size:0"><table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td style="border-bottom: 1px solid #f4f4f4; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%; height: 1px; width: 100%; margin: 0px;"></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><table class="es-content" cellspacing="0" cellpadding="0" align="center"><tbody><tr><td class="esd-stripe" esd-custom-block-id="6341" align="center" bgcolor="#1972a4" style="background-color: #1972a4;"><table class="es-content-body" style="background-color: transparent;" width="610" cellspacing="0" cellpadding="0" align="center"><tbody><tr><td class="esd-structure" align="left"><table width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td class="esd-container-frame" width="610" valign="top" align="center"><table style="background-color: #ffecd1; border-radius: 4px; border-collapse: separate;" width="100%" cellspacing="0" cellpadding="0" bgcolor="#ffecd1"><tbody><tr><td class="esd-block-text es-p30t es-p30r es-p30l" align="center"><p>Hackathon UNAC S.A.</p></td></tr><tr><td class="esd-block-text es-p30b es-p30r es-p30l" esdev-links-color="#ffa73b" align="center"><a target="_blank" href="https://www.hackathon-unac.herokuapp.com/nosotros" style="color: #ffa73b;">Equipo de desarrollo, 2021</a></td></tr></tbody></table></td></tr><tr><td width="610" class="esd-container-frame" align="center" valign="top"><table cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td class="esd-block-spacer es-p10t es-p20b es-p20r es-p20l" align="center" style="font-size:0"><table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td style="border-bottom: 1px solid #f4f4f4; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%; height: 1px; width: 100%; margin: 0px;"></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><table cellpadding="0" cellspacing="0" class="esd-footer-popover es-content" align="center"><tbody><tr><td class="esd-stripe" esd-custom-block-id="6342" align="center"><table class="es-content-body" width="610" cellspacing="0" cellpadding="0" align="center" style="background-color: transparent;"><tbody><tr><td class="esd-structure es-p30t es-p30b es-p30r es-p30l" align="left"><table width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td class="esd-container-frame" width="550" valign="top" align="center"><table width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td align="left" class="esd-block-text es-p25t"><p>Te enviamos este correo electrónico para notificarte acerca de cambios importantes en los servicios y en tu Cuenta de &nbsp;Vehicular S.A.</p></td></tr><tr><td class="esd-block-text es-p25t" align="left"><p>© 2021 Hackathon UNAC S.A. ,&nbsp;<a>Plataforma Virtual,&nbsp;COLOMBIA</a></p></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></div></body></html>`
}
