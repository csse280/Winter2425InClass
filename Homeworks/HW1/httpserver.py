import socket
import time
import signal
import traceback


def main():

    server = create_connection(port = 8080)

    while True:
        connection_to_browser = accept_browser_connection_to(server)

        reader_from_browser = connection_to_browser.makefile(mode='rb')
        try:
            request_line = reader_from_browser.readline().decode("utf-8")
            print()
            print('Request:')
            print(request_line)
                
        except Exception as e:
            print("Error while reading HTTP Request:", e)
            traceback.print_exc() # Print what line the server crashed on.
            shutdown_connection(connection_to_browser)
            continue

        # 3. Write the HTTP Response back to the browser
        writer_to_browser = connection_to_browser.makefile(mode='wb')
        try:
            filename = request_line.split(" ")[1]
            if filename == "/shutdown":
                print("Server shutting down")
                exit()            
            if filename == "/":
                filename = "/index.html"
            with open(f"./public{filename}", 'rb') as file:
                response_body = file.read()
            
            content_type = 'text/html; charset=utf-8'
            if filename.endswith(".html"):
                content_type = 'text/html; charset=utf-8'
            elif filename.endswith(".png"):
                content_type = "image/png"
            elif filename.endswith(".jpeg"):
                content_type = "image/jpeg"
            elif filename.endswith(".ico"):
                content_type = "image/x-icon"
            elif filename.endswith(".js"):
                content_type = "text/javascript"
            elif filename.endswith(".css"):
                content_type = "text/css"

            response_headers = "\r\n".join([
                'HTTP/1.1 200 OK',
                f'Content-Type: {content_type}',
                f'Content-length: {len(response_body)}',
                'Connection: close',
                '\r\n'
            ]).encode("utf-8")

            # These lines do the real work; they WRITE the HTTP Response to the Browser.
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
    print(f'Server started on port {port}. Try: http://localhost:{port}/index.html')
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
