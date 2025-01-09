import socket
import time
import signal
#added for parsing urls
#FIXED - needed the .parse added in the starter the day before
import urllib.parse
#added for tracing prints
import traceback

###################################
#external python file import to demo building html on the fly
from dynamic_demo import *
server_variables={}
server_variables["abc"] = 123
###################################

WEB_HOME = "./public"



# Done #1: store shopping list on the server
import json
shopping_list = {}
# shopping_list['bread'] = 0
# shopping_list['bananas'] = 0
# shopping_list['milk'] = 1

####################

# This is a special method for us to determine special handling of route
# This happens BEFORE we try to read from file, but if we set a response_body
# or set a dictionary, then those will be used
def handle_special_routes(file_name, post_data):
    global shopping_list
    #when these parameters are set, they will get used
    special_response_body=""
    special_dict=""
    special_content_type=""

    if(file_name == "/shutdown"):
        print("Shutting down")
        exit()
    
    #injection example
    elif (file_name == "/template.html"):
        special_dict={}
        special_dict["foo"] = "bar"

    elif (file_name == "/dynamic_demo"):
        add_random_entry(server_variables)
        special_response_body = generate_dynamic_response_body(server_variables)
    
    elif (file_name == "/API/hello"):
        # special_response_body = "Hello Ajax World".encode("utf-8")
        special_response_body = bytearray("Hello Ajax World!", encoding="utf-8")
    
    elif "/API/LOAD" in file_name:
        print("Called Server route to LOAD")
        data = json.dumps(shopping_list)
        special_content_type = "application/json"
        special_response_body = bytearray(data, encoding="utf-8")

    elif "/API/SAVE" in file_name:
        print("Called Server route to SAVE")
        print(post_data)
        shopping_list = post_data
        special_response_body = bytearray("Success!", encoding="utf-8")
    
#####################################################

# TODO #2: add a route for /API/hello

# SKIP! #3: add a route for /API/ADD/foo=bar&a=123...

# TODO #4: add a route for /API/LOAD which sends client the shopping list

# TODO #5: add a route for /API/SAVE which saves the data from the shopping list
# Requires a POST request in order to function
# And tells the user how many new items were added
   
#####################################################
    
    return file_name, special_response_body, special_dict, special_content_type 

def main():

    server = create_connection(port = 8080)

    while True:
        connection_to_browser = accept_browser_connection_to(server)

        with(connection_to_browser):

            reader_from_browser = connection_to_browser.makefile(mode='rb')
            writer_to_browser = connection_to_browser.makefile(mode='wb')
            
            with(reader_from_browser):
                try:
                    request_line = reader_from_browser.readline()
                    request_line = request_line.decode("utf-8")
                    request_method = request_line.split(' ')[0]
                    file_name = request_line.split(' ')[1]

                    headers = get_headers(reader_from_browser)
                    
                    #in case we want to check it later
                    post_data="" 
                    if(request_method == "POST"):
                        post_data = get_post_data(reader_from_browser, headers)
                        

                except socket.timeout:
                    continue
                except KeyboardInterrupt:
                    exit(0)
                except Exception as e:
                    print("Error after reader_from_browser")
                    error_message = traceback.format_exc()
                    print(error_message)

            
            with(writer_to_browser):
                try:
                    #special routes  - change file_name, provide a body_response, provide dictionary
                    file_name, response_body, dict, content_type = handle_special_routes(file_name, post_data)
            
                    # inject WEB_HOME before opening file to read
                    file_name = f"{WEB_HOME}{file_name}"

                    #only get the response if it is not already set
                    if response_body == "":
                        response_body = get_response_body(file_name, dict)
                    
                    #no need to set content_type if it is already set
                    if content_type == "":
                        content_type = get_content_type(file_name)
                    
                    write_to_browser(content_type, response_body, writer_to_browser)

                except Exception as e:
                    # DONE: handle error in a better manner
                    print("Error after writer_to_browser")
                    #DONE - 1. get an error traceback as a string
                    error_message = traceback.format_exc()
                    print(error_message)
                    #DONE - 2. use a special error page to show results
                    file_name="/error.html"
                    file_name = f"{WEB_HOME}{file_name}"
                    #DONE - 3. insert error trace into page
                    dict ={}
                    dict["error_message"] = error_message
                    response_body = get_response_body(file_name, dict)
                    content_type = get_content_type(file_name)
                    #DONE - 4. write to browser
                    write_to_browser(content_type, response_body, writer_to_browser)

            #clear out old data
            connection_to_browser.shutdown(socket.SHUT_RDWR)
            connection_to_browser.close()


def get_headers(reader_from_browser):
    headers = {}
    header_line = reader_from_browser.readline().decode("utf-8")
    while(True):
        if(header_line == '\r\n'):
            break
        pair = header_line.split(": ")
        headers[pair[0]] = pair[1].strip()
        header_line = reader_from_browser.readline().decode("utf-8")
    return headers

def get_post_data(reader_from_browser, headers):
    request_body = reader_from_browser.read(int(headers["Content-Length"]))
    post_lines = request_body.decode("utf-8")
    print(     "request_body"           )
    print(  request_body  )

    post_data = {}
    if(headers["Content-Type"] == "text/plain"):
        fields = post_lines.split("\r\n")
        for field in fields:
            if(field == ""):
                continue
            split_field = field.split("=")
            post_data[split_field[0]] = split_field[1]
    elif headers["Content-Type"] == "application/json":
        post_data = json.loads(post_lines)
    else:
        #FIXED (had an error in the code yesterday)
        fields = post_lines.split("&")
        for field in fields:
            if(field == ""):
                continue
            split_field = field.split("=")
            post_data[urllib.parse.unquote_plus(split_field[0])] = urllib.parse.unquote_plus(split_field[1])  
    return post_data

def get_content_type(file_name):
    #added check here to only set file_extension when there is one
    if len(file_name.split(".")) > 1:
        file_extension = file_name.split(".")[-1]
    else:
        file_extension=""

    if(file_extension == "html"):
        content_type = 'text/html; charset=utf-8'
    elif(file_extension == "png"):
        content_type = 'image/png'
    elif(file_extension == "ico"):
        #https://www.w3schools.com/html/html_favicon.asp
        content_type = 'image/x-icon'
    elif(file_extension == "jpeg"):
        content_type = 'image/jpeg'
    elif(file_extension == "js"):
        content_type = 'text/javascript; charset=utf-8'
    elif(file_extension == "css"):
        content_type = 'text/css; charset=utf-8'
    else:
        #let's try to allow reading anything as html
        content_type = 'text/html; charset=utf-8'
    return content_type

def write_to_browser(content_type, response_body, writer_to_browser):
    response_headers = bytearray("\r\n".join([
        'HTTP/1.1 200 OK',
        f'Content-Type: {content_type}',
        f'Content-length: {len(response_body)}',
        'Connection: close',
        '\r\n'
    ]), encoding = "utf-8")

    print()
    print('Response headers:')
    print(response_headers)
    print()
    print('Response body:')
    print(response_body)
    print()

    writer_to_browser.write(response_headers)
    writer_to_browser.write(response_body)
    writer_to_browser.flush()

def get_response_body(file_name, dict):
    with(open(file_name, "rb") as fd):
        response_body = bytearray(fd.read())
        if dict != "":
            #inject variables into the body
            content = response_body.decode("utf-8")
            content = content.format(**dict)
            response_body = bytearray(content, encoding="utf8")

    return response_body

def create_connection(port):
    addr = ("", port)  # "" = all network adapters; usually what you want.
    server = socket.create_server(addr)
    server.settimeout(2)
    print(f'Server started on port {port}. Try: http://localhost:{port}/shopping.html')
    return server

def accept_browser_connection_to(server):
    while True:
        try:
            (conn, address) = server.accept()
            conn.settimeout(2)
            return conn
        except socket.timeout:
            print(".", end="", flush=True)
        except KeyboardInterrupt:
            exit(0)

main()
