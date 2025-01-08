import random

def generate_dynamic_response_body(dict):
    #build up string programmatically
    response_body = """
    <html>
        <head>
            <title>Dynamic Demo</title>
            <link rel="stylesheet" href="styles/style.css">
        </head>
        <body>
            <h1>Rendering Server-Side Variables Dynamically</h1>
            <ul>
    """
    ############################################################
    # Append list items based on the provided dictionary
    # TODO add in a <li> with the key value pair for each entry
    ############################################################
    



    
    #close the ul, body, html for a completed html page
    response_body += """
            </ul>
        </body>
    </html>
    """ 
    #prepared to write to the browser
    response_body = bytearray(response_body, encoding = "utf-8")
    return response_body

#add random entry to dictionary that does not already exist
def add_random_entry(dict):
    rnd = random.randint(1,1000)
    i=0
    while ( f"r{i}" in dict):
        i+=1
    dict[f"r{i}"] = rnd