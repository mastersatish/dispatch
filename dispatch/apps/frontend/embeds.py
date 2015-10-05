from django.template import loader, Context

class EmbedLibrary(object):

    def __init__(self):
        self.library = {}

    def register(self, name, function):
        self.library[name] = function

    def call(self, name, args):
        if name in self.library:
            return self.library[name](args)

    def json(self, type, data):
        if type in self.library:
            return self.library[type].json(data)
        else:
            return data

    def render(self, type, data):
        if type in self.library:
            return self.library[type].render(self.library[type], data)

embedlib = EmbedLibrary()


def tag(tag, content):
    return "<{tag}>{content}</{tag}>".format(tag=tag, content=content)

def maptag(tagname, contents):
    """Returns the HTML produced from enclosing each item in
    `contents` in a tag of type `tagname`"""
    return ''.join(tag(tagname, item) for item in contents)


class AbstractController(object):

    @staticmethod
    def json(data):
        return data

class AbstractTemplateRenderController(AbstractController):

    TEMPLATE = None
    
    @staticmethod
    def render(self, data):
        print data
        template = loader.get_template(self.TEMPLATE)
        c = Context(data)
        return template.render(c)


class ListController(AbstractController):

    @staticmethod
    def render(self, data):
        return tag("ul", maptag("li", data))

class HeaderController(AbstractController):

    @staticmethod
    def render(self, data):
        return tag("h1", data['content'])

class CodeController(AbstractController):

    @staticmethod
    def render(self, data):
        tags = {
            'css': 'style',
            'javascript': 'script'
        }
        try:
            return tag(tags[data['mode']], data['content'])
        except KeyError:
            return data['content']

class VideoController(AbstractTemplateRenderController):

    TEMPLATE = "article/embeds/video.html"

class AdvertisementController(AbstractTemplateRenderController):

    TEMPLATE = "article/embeds/advertisement.html"

class PullQuoteController(AbstractTemplateRenderController):

    TEMPLATE = "article/embeds/quote.html"



embedlib.register('quote', PullQuoteController)
embedlib.register('code', CodeController)
embedlib.register('advertisement', AdvertisementController)
embedlib.register('header', HeaderController)
embedlib.register('list', ListController)
embedlib.register('video', VideoController)
