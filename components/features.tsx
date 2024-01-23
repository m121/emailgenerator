import { Card, CardContent, CardHeader } from "./ui/card"

export const Features = () =>{
    return (<div className="py-4 sm:py-16">
         <section>
          <h2 className="text-3xl font-bold text-center py-4 text-gray-800">Key Features</h2>
          <div className="grid gap-6 md:grid-cols-3 sm:mt-8 mt-4">
            <Card>
              
              <CardContent>
                <p className="text-lg text-gray-500 text-center py-16">
               Effortlessly compose diverse emails that resonate with customers, connect with family, and engage friends, all with ease
                </p>
              </CardContent>
            </Card>
            <Card>
             
              <CardContent>
                <p className="text-lg text-gray-500 text-center py-16">
                Respond to any business email in any language and tone, showcasing adaptability and enhancing connections.
                </p>
              </CardContent>
            </Card>
            <Card>
              
              <CardContent>
                <p className="text-lg text-gray-500 py-16 text-center">
                Refines grammar in any email, ensuring polished communication before you hit send.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
    </div>)
}