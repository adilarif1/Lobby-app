#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import os
import urllib
import webapp2
import datetime
import logging
import re
import mimetypes

from google.appengine.api import images
from google.appengine.ext import db
from google.appengine.ext import ndb
from google.appengine.api import images
from webapp2_extras import json
from google.appengine.ext import blobstore
from google.appengine.ext.webapp import blobstore_handlers
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.ext.webapp import util
from google.appengine.ext.webapp import template


class PublicImageUpload(ndb.Model):
    
    title = ndb.StringProperty()
    image = ndb.BlobProperty()
    time = ndb.DateTimeProperty(auto_now_add=True)
    username = ndb.StringProperty()
    random = ndb.StringProperty()
    
    def toJSON(self):
        jsondata = {
            "title" : self.title,
            "time" : self.time.strftime("%A %d/%m/%Y %H:%M"),
            "username" : self.username,
            "random" : self.random
        }
        return json.encode(jsondata)


class User(ndb.Model):

    title = ndb.StringProperty()
    image = ndb.BlobProperty()
    time = ndb.DateTimeProperty(auto_now_add=True)
    password = ndb.StringProperty(required=True)
    email = ndb.StringProperty(required=True)
    #dob = ndb.StringProperty(required=True)
    #maidenName = ndb.StringProperty(required=True)
    banned = ndb.BooleanProperty(required=True)
    def toJSON(self):
        jsondata = {
            #"image" : self.image,
            "username" : self.key.id(),
            "password" : self.password,
            "email" : self.email,
            "time" : self.time.strftime("%A %d/%m/%Y %H:%M"),
            "banned" : self.banned
        }
        return json.encode(jsondata)

    def userImage(self):
        
        return


class NewUserHandler(webapp2.RequestHandler):
    
    def post(self):
        
        img = self.request.get('file')
        username = self.request.get('user')
        logging.debug("username: " + username)
        password = self.request.get('pass')
        email= self.request.get('email')
        #dob = self.request.get('dob')
        #maidenName = self.request.get('maidenName')
        banned = False
        callback = self.request.get('callback')
        #Check that user exists
      
        user = User.get_by_id(username)
        
        if user:
        
           self.response.write(callback + '({"User Exists"})')
        
        else:
           
           user= User(id=username)
           user.title = 'test02'
           user.banned = banned
           user.password = password
           user.email = email
           #user.dob = dob
           #user.maidenName = maidenName
           optImg = images.resize(img, 100, 100)
           user.image = optImg
           user.put()
           self.response.write(callback + '({"response":"Image Added"})')

class NewPublicImageUploadHandler(webapp2.RequestHandler):
    
    def post(self):

        title = self.request.get('title')
        newImg = self.request.get('img')
        username = self.request.get('user')
        radNum = random.random()
        
        img = PublicImageUpload(image = newImg)
        img.title = title
        img.username = username
        img.random = radNum


class ServeImageHandler(webapp2.RequestHandler):
    
    def get(self):
        image_key = ndb.Key(urlsafe=self.request.get('img_id'))
        photo = image_key.get()
        if photo.image:
            #Adding an astrik after content type image allows automation of image selection
            self.response.headers['Content-Type'] = 'image/png'
            self.response.out.write(photo.image)
        else:
            self.response.out.write('No image')


class Message(ndb.Model):
	# Using item_code as a key. 
	msg = ndb.StringProperty()
	user = ndb.StringProperty()

	time = ndb.DateTimeProperty(auto_now_add=True)
	def toJSON(self): 
		jsondata = {
			"id" : self.key.id(),
			"message" : self.msg,
			"time" : self.time.strftime("%H:%M"),
			"user" : self.user
           
		}
		return json.encode(jsondata)
		
class Comment(ndb.Model):
	# Using item_code as a key. 
	comment = ndb.StringProperty()
	msgId = ndb.StringProperty() 
	user = ndb.StringProperty()
	time = ndb.DateTimeProperty(auto_now_add=True)
	def toJSON(self): 
		jsondata = {
			"id" : self.key.id(),
			"comment" : self.comment,
			"time" : self.time.strftime("%H:%M"),
			"msgId" : self.comment,
			"user" : self.user
		}
		return json.encode(jsondata)


class LoginUserHandler(webapp2.RequestHandler):
	def post(self):
		#email = self.request.get('#email')
		usr = self.request.get('user')
		password = self.request.get('pass')
		callback = self.request.get('callback')
		#get user from database
		#user = User.get_by_id(#email)
		user = User.get_by_id(usr)
		passwrd = user.password
        
		#if user exists check for correct password
		
		if user:
            
			if passwrd == password:
                
                #if user.isBanned():
                    
                    #self.response.write(callback + '({"response":"login banned"})')
                
                #else:
                    
					self.response.write(callback + '({"response":"login Password success"})')
			else:
				self.response.write(callback + '({"response":"login Password incorrect"})')
		else:
			self.response.write(callback + '({"response":"login not found"})')
	
	
class RecoverUserHandler(webapp2.RequestHandler):
	def get(self):
		#email = self.request.get('#email')
		usr = self.request.get('user')
		password = self.request.get('pass')
		callback = self.request.get('callback')
		#get user from database
		#user = User.get_by_id(#email)
		user = User.get_by_id(usr)
		
		#if user exists check for correct password
		
		if user:
			passwrd = user.password
			if passwrd == password:
				if user.isBanned():
					self.response.write(callback + '({"response":"login banned"})')
				else:
					self.response.write(callback + '({"response":"login Complete"})')
			else:
				self.response.write(callback + '({"response":"login Password incorrect"})')
		else:
			self.response.write(callback + '({"response":"login not found"})')
	
			
class NewMessageHandler(webapp2.RequestHandler):
	
	def get(self):
		usr = User.get_by_id(self.request.get("user"))
		callback = ''
		logging.debug("mesage Handler Call")
		if usr:
			msg = self.request.get("message")
			callback = self.request.get('callback')
			item = Message()
			item.msg = msg
			item.user = usr.key.urlsafe()
			item.put()
			self.response.write(callback + '({"response":"message Added"})')
		else:
			self.response.write(callback + '({"response":"User not found."})')

class NewCommentHandler(webapp2.RequestHandler):
	
	def get(self):
		usr = User.get_by_id(self.request.get("user"))
		message = Message.get_by_id(int(self.request.get("msgid")))
		if usr: 
			if message:
				cmt = self.request.get("comment")
				callback = self.request.get('callback')
				item = Comment()
				item.msgId = str(message.key.id())
				item.user=usr.key.id()
				item.comment = cmt
				item.put()
				self.response.write('({"response":"comment Added"})')
			else:
				self.response.write('({"response":"Message not found."})')
		else:
			self.response.write(callback + '({"response":"User not found."})')
	
	
class DeleteUserHandler(webapp2.RequestHandler):
	
	def get(self):
		usr = User.get_by_id(self.request.get("userID"))
		callback = ''
		logging.debug("mesage Handler Call")
		if usr:
			usr.key.delete()
			self.response.write(callback + '({"response":"User Deleted"})')
		else:
			self.response.write(callback + '({"response":"User not found."})')
						
class UserMessagesHandler(webapp2.RequestHandler):
	
	def get(self):
		usr = User.get_by_id(self.request.get('user'))
		callback = self.request.get('callback')
		if usr:
			# Set up data for the user and her/his list of purchases...
			response = callback + '({"user":"'+usr.key.id()+'", "message":[%s]})'
			# Now the messages...
			m = ""
			messages = Message.query() # gets every message
			messages = messages.filter(Message.user==usr.key.id())
			if messages.count > 0:
			    for mesg in messages:
				    m += mesg.toJSON() + ','
			    # There is now a trailing ',' to get rid of...
			    m = m[:-1]
			self.response.write(response % (m))
			
class MessagesHandler(webapp2.RequestHandler):
	
	def get(self):
		#usr = User.get_by_id(self.request.get('user'))
		callback = self.request.get('callback')
		# Set up data for the user and her/his list of purchases...
		response = callback + '[%s]'
		# Now the messages...
		m = ""
		a_messages = Message.query().order(-Message.time) # gets every message sorted by time
		messages = a_messages.fetch() #no more than 30 messages should (finnaly) be sent to the server
		if messages.count > 0:
            
			for mesg in messages:
                
				m += '{"image"' + ":" + '"' + str(mesg.user) +  '"' + ',' + mesg.toJSON()  + ','
    
			# There is now a trailing ',' to get rid of... beacuse json does not allow a trailling slash
			
			m = m[:-1]
		self.response.write(response % (m))


class AllUsersHandler(webapp2.RequestHandler):
    
    def get(self):
        #usr = User.get_by_id(self.request.get('user'))
        callback = self.request.get('callback')
        # Set up data for the user and her/his list of purchases...
        response = callback +  '[%s]'
        u = ""
        uImge = ""
        
        users = User.query().order(-User.time)
        #messages = a_messages.fetch(limit=30) no more than 30 messages should (finnaly) be sent to the server
        if users.count > 0:
            for usr in users:
                
               
                # Adding additional bracket and string: image, mimics JSON package along with an authentic JSON construction
               
                # This allows delivery of content in simplistic fashion/order, without the use of Python API's
                u += '{"image"' + ":" + '"' + str(usr.key.urlsafe()) +  '"' + ',' + usr.toJSON()  + ','
                
                #self.response.write(uImge + "</br>")
                # There is now a trailing ',' to get rid of...
            u = u[:-1]
            self.response.write(response % (u) )



class MessageCommentsHandler(webapp2.RequestHandler):
		
	def get(self):
		msg = Message.get_by_id(int(self.request.get('msgid')))
		callback = self.request.get('callback')
		if msg:
          
			# Set up data for the user and her/his list of messages...
            #response = callback + '{"Message":"'+msg.msg +'", "Comments":[%s]}'
			response = callback + '{"Message":"'+msg.msg +'", "Comments":[%s]}'
			# Now the messages...
			c = ""
			comments = Comment.query().order(-Comment.time) # gets every comment
			comments = comments.filter(Comment.msgId==self.request.get('msgid'))
			comments = comments.fetch(limit=30)
			if comments.count > 0:
				for comm in comments:
					c += comm.toJSON() + ','
				# There is now a trailing ',' to get rid of...
				c = c[:-1]
			self.response.write(response % (c))
		else:
			self.response.write("error")

class MainHandler(webapp2.RequestHandler):
   def get(self):
        #upload_url = blobstore.create_upload_url('/upload')
        self.response.out.write('<html><body>')
        self.response.out.write('<form action="/usr" method="POST" enctype="multipart/form-data">')
        self.response.out.write("""Upload File: <input type="file" name="file"><br><h3>Username</h3><input type="text" name="user" id="user"><br/><h3>Password</h3><br/>
        <input type="text" name="pass" id="pass">
        <h3>D.O.B</h3><br/><input type="text" name="dob" id="dob"><h3>E-mail<h3/><br/>
        <input type="text" name="email" id="email"><h3>Maiden Name</h3><br/><input type="text" name="maidenName" id="maidenName"><input type="submit" name="submit" value="Submit"></form></body></html>""")
        usrs = ""
        
        #for b in blobstore.BlobInfo.all():
            
        #self.response.out.write('<li><a href="/serve/%s' % str(b.key()) + '">' + str(b.filename) + '</a>')

        userQuery = User.query().order(-User.time).fetch()
        
        for usrs in userQuery:
            
            if usrs.image:
               #Logical to server image key, less stress on server rounds!
               
               self.response.out.write('<div><img src="/img?img_id=%s"></img>' % usrs.key.urlsafe() )
               
               if usrs.email:
            
                   self.response.out.write(usrs.email + " " + usrs.password )
               
               else:
            
                   self.response.out.write('email not found')
            else:
                
               self.response.out.write("no image found")



app = webapp2.WSGIApplication([
	('/', MainHandler),
    ('/usr', NewUserHandler),
    ('/pubimg', NewPublicImageUploadHandler),
    ('/img', ServeImageHandler),
	('/login', LoginUserHandler),
	('/recover',RecoverUserHandler),
	('/msg', NewMessageHandler),
	('/cmt', NewCommentHandler),
	('/dltusr', DeleteUserHandler),
	('/listu', UserMessagesHandler),
	('/lista', MessagesHandler),
	('/listusrs', AllUsersHandler),
	('/listc', MessageCommentsHandler)
], debug=True)
