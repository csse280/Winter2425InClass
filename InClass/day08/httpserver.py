import socket
import time
import signal
import traceback

def main():

    server = create_connection(port = 8080)

    while True:
        # 1. Wait for the browser to send a HTTP Request
        connection_to_browser = accept_browser_connection_to(server)

        # 2. Read the HTTP Request from the browser
        reader_from_browser = connection_to_browser.makefile(mode='rb')
        try:
            request_line = reader_from_browser.readline().decode("utf-8") # decode converts from bytes to text
            print()
            print('Request:')
            print(request_line)

            # TODO: get the Request Method
            file_name = "." + request_line.split(' ')[1]
            file_extension = file_name.split(".")[2]
            print('Requested file:', file_name)
            print('Extension:', file_extension)

            # TODO: read all Request Headers into a dictionary.

            # TODO: if POST:
                # TODO: 1. Retrieve the Request Body: it is exactly Content-Length bytes long.
                # TODO: 2. Decode the Request Body.
                # TODO: 3. Convert the Request Body into a dictionary.
                # TODO: 4. Decide what to do with the data.

        except Exception as e:
            print("Error while reading HTTP Request:", e)
            traceback.print_exc() # Print what line the server crashed on.
            shutdown_connection(connection_to_browser)
            continue

        # Handle Special Routes (from lab)
        if(file_name == "./shutdown"):
            print("Shutting down")
            exit()


        # 3. Write the HTTP Response back to the browser
        writer_to_browser = connection_to_browser.makefile(mode='wb')
        try:
            with(open(file_name, "rb") as fd):
                # Lab TODO: introduce server-side rendering here
                response_body = fd.read()
            content_type = ""
            if(file_extension == "html"):
                content_type = 'text/html; charset=utf-8'
            elif(file_extension == "ico"):
                content_type = "image/x-icon"
            elif(file_extension == "png"):
                content_type = 'image/png'
            elif(file_extension == "jpeg"):
                content_type = 'image/jpeg'
            elif(file_extension == "js"):
                content_type = 'text/javascript; charset=utf-8'
            elif(file_extension == "css"):
                content_type = 'text/css; charset=utf-8'

            response_headers = "\r\n".join([
                'HTTP/1.1 200 OK',
                f'Content-Type: {content_type}',
                f'Content-length: {len(response_body)}',
                'Connection: close',
                '\r\n'
            ]).encode("utf-8")

            # These lines just PRINT the HTTP Response to your Terminal.
            print()
            print('Response headers:')
            print(response_headers)
            print()
            print('Response body:')
            print(response_body)
            print()

            # These lines do the real work; they write the HTTP Response to the Browser.
            writer_to_browser.write(response_headers)
            writer_to_browser.write(response_body)
            writer_to_browser.flush()
        except Exception as e:
            print("Error while writing HTTP Response:", e)
            traceback.print_exc() # print what line the server crashed on
    
        shutdown_connection(connection_to_browser)



# Don't worry about the details of the rest of the code below.
# It is VERY low-level code for creating the underlying connection to the browser.

def create_connection(port):
    addr = ("", port)  # "" = all network adapters; usually what you want.
    server = socket.create_server(addr, family=socket.AF_INET6, dualstack_ipv6=True) # prevent rare IPV6 softlock on localhost connections
    server.settimeout(2)
    print(f'Server started on port {port}. Try: http://localhost:{port}/hello.html')
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

def shutdown_connection(connection_to_browser):
    connection_to_browser.shutdown(socket.SHUT_RDWR)
    connection_to_browser.close()


print()
main()
