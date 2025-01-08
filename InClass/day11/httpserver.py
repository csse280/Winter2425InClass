import socket
import time
import signal

#added for parsing urls
import urllib
#added for tracing prints
import traceback

# Set a constant to determine where we should be loaded files from
# It is a good idea to put your public files here and not your private files
# Why might that be a good idea?
#TODO change to "./public"
WEB_HOME = "."


#   1. Practice Debugging via the Python Debugger
#   2. Refactor Existing Code (pull out code into functions)
#   3. Add a new <li> to list1 on shopping.html via JavaScript
#   4. Make it so button1 clicks will add a new item to list1 based on text1's value
#   5. Make it so mousing over <li> makes them appear differently (JS and CSS versions)
#   6. Make it so that clicking on an <li> adds strikethrough text decoration (and toggle)
#   7. Make it so that clicking on an <li> will move between list1 and list2 (toggle)
#   8. Make it so that all existing items (see data in script.js at top) get added when the page loads
#   As time allows:
#   9. Let's look at an example of dynamic rendering a page instead of javascript


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
                    file_extension = file_name.split(".")[2]

                    headers = {}
                    header_line = reader_from_browser.readline().decode("utf-8")
                    while(True):
                        if(header_line == '\r\n'):
                            break
                        pair = header_line.split(": ")
                        headers[pair[0]] = pair[1]
                        header_line = reader_from_browser.readline().decode("utf-8")
                    
                    #in case we want to check it later
                    post_data="" 
                    if(request_method == "POST"):
                        request_body = reader_from_browser.read(int(headers["Content-Length"]))
                        post_lines = request_body.decode("utf-8").split("\r\n")

                        post_data = {}
                        if(headers["Content-Type"] == "text/plain"):
                            fields = post_lines.split("\r\n")
                            for field in fields:
                                if(field == ""):
                                    continue
                                split_field = field.split("=")
                                post_data[split_field[0]] = split_field[1]
                        else:
                            fields = request_body.split("&")
                            for field in fields:
                                if(field == ""):
                                    continue
                                split_field = field.split("=")
                                post_data[urllib.parse.unquote_plus(split_field[0])] = urllib.parse.unquote_plus(split_field[1])                        

                except socket.timeout:
                    continue
                except KeyboardInterrupt:
                    exit(0)
                except Exception as e:
                    print("Error after reader_from_browser")
                    print(e)

            if(file_name == "/shutdown"):
                print("Shutting down")
                exit()

            with(writer_to_browser):
                try:
                    # inject WEB_HOME before opening file to read
                    file_name = f"{WEB_HOME}{file_name}"
                    with(open(file_name, "rb") as fd):
                        response_body = bytearray(fd.read())

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
                except Exception as e:
                    # TODO: handle error in a better manner
                    print("Error after writer_to_browser")
                    print(e)
                    #TODO - 1. get an error traceback as a string
                    #TODO - 2. use a special error page to show results
                    #TODO - 3. insert error trace into page
                    #TODO - 4. write to browser


            #clear out old data
            connection_to_browser.shutdown(socket.SHUT_RDWR)
            connection_to_browser.close()


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
