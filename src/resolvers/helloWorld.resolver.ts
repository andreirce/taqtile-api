import { Query, Resolver } from "type-graphql";

@Resolver()
export class HelloWorld {

    @Query(() => String)
    async HelloWorld(){
        return "Hello, World!"
    }

}